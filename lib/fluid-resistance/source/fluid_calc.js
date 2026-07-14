// utils/fluid_calc.js - 流体计算核心引擎（JavaScript 版）
const C = require('./constants.js');

// ========== Churchill 统一摩擦因子公式 ==========
function churchill_f(Re, eps_d = 0.0) {
  Re = Math.max(Re, 1e-12);
  const A = Math.pow(2.457 * Math.log(1.0 / (Math.pow(7.0 / Re, 0.9) + 0.27 * eps_d)), 16);
  const B = Math.pow(37530.0 / Re, 16);
  return 8.0 * Math.pow(Math.pow(8.0 / Re, 12) + 1.0 / Math.pow(A + B, 1.5), 1.0 / 12.0);
}

// ========== 水的物性公式 ==========
function water_density(t_celsius) {
  const t = t_celsius;
  return 1000 * (1 - (t + 288.9414) * Math.pow(t - 3.9863, 2) / (508929.2 * (t + 68.12963)));
}

function water_dynamic_viscosity(t_celsius) {
  return 0.00002414 * Math.pow(10, 247.8 / (t_celsius + 273.16 - 140));
}

function water_kinematic_viscosity(t_celsius) {
  return water_dynamic_viscosity(t_celsius) / water_density(t_celsius);
}

// ========== 空气的物性公式 ==========
function air_density(t_celsius) {
  const t_kelvin = t_celsius + 273.15;
  return 101325 / (287 * t_kelvin);
}

function air_dynamic_viscosity(t_celsius) {
  const t_kelvin = t_celsius + 273.15;
  return 1.716e-5 * Math.pow(t_kelvin / 273.15, 1.5) * (383.55 / (t_kelvin + 110.4));
}

function air_kinematic_viscosity(t_celsius) {
  return air_dynamic_viscosity(t_celsius) / air_density(t_celsius);
}

// ========== 沿程阻力计算 ==========
function pressure_loss_along_length(Q_m3s, d_m, L_m, nu, rho, eps_d = 0.0) {
  const A = C.pi * (d_m * d_m) / 4.0;
  if (A <= 0 || Q_m3s <= 0) {
    return { deltaP: 0, lamda: 0, u: 0, Re: 0, thickness_laminar_floor: 0, R: 0, Hf: 0, unitH: 0 };
  }
  const u = Q_m3s / A;
  const Re = nu > 0 ? u * d_m / nu : 0;
  const lamda = churchill_f(Re, eps_d);
  const deltaP = d_m > 0 ? lamda * (L_m / d_m) * (0.5 * rho * u * u) : 0;
  const Hf = rho > 0 ? deltaP / (rho * C.g) : 0;
  const R_val = L_m > 0 ? deltaP / L_m : 0;
  const unitH = L_m > 0 ? Hf / L_m : 0;
  let thickness_laminar_floor = 0;
  if (Re > 0 && lamda > 0) {
    thickness_laminar_floor = 34.2 * d_m / (Re * Math.sqrt(lamda));
  }
  return { deltaP, lamda, u, Re, thickness_laminar_floor, R: R_val, Hf, unitH };
}

// ========== 小孔节流雷诺修正系数 ==========
function orifice_FR(Re, Re_c = C.DEFAULT_Re_c) {
  if (Re < 0.01) {
    return Re > 0 ? Math.sqrt(Re / Re_c) : 0.0;
  }
  return 1.0 / Math.sqrt(1.0 + Re_c / Re);
}

// ========== Cv 压降（平方律） ==========
function cv_pressure_drop(Q_mlmin, Cv, rho_kgm3) {
  const Q_usgal = Q_mlmin * 0.000264172;
  const SG = rho_kgm3 / 1000.0;
  const deltaP_psi = Cv > 0 ? (Q_usgal * Q_usgal) * SG / (Cv * Cv) : 0;
  return deltaP_psi * C.PSI2PA;
}

// ========== Cv 当量反算 ==========
function cv_equivalent(Q_mlmin, deltaP_Pa, rho_kgm3) {
  if (deltaP_Pa <= 0) return 0;
  const deltaP_psi = deltaP_Pa / C.PSI2PA;
  const SG = rho_kgm3 / 1000.0;
  const Q_usgal = Q_mlmin * 0.000264172;
  return deltaP_psi > 0 ? Q_usgal / Math.sqrt(deltaP_psi / SG) : 0;
}

// ========== Cv 压降（低雷诺数修正） ==========
function cv_pressure_drop_corrected(Q_mlmin, Cv0, rho_kgm3, mu, d_mm, Re_c = 30) {
  if (Cv0 <= 0 || d_mm <= 0 || Q_mlmin <= 0) return 0.0;
  const Q_m3s = Q_mlmin / C.M3S2MLMIN;
  const d_m = d_mm / 1000.0;
  const A = C.pi * (d_m * d_m) / 4.0;
  if (A <= 0) return 0.0;
  let Re = 0;
  if (mu > 0 && d_m > 0) {
    Re = (4.0 * rho_kgm3 * Q_m3s) / (C.pi * d_m * mu);
  }
  const FR = orifice_FR(Re, Re_c);
  const Cv_eff = Cv0 * FR;
  return cv_pressure_drop(Q_mlmin, Cv_eff, rho_kgm3);
}

// ========== 局部阻力系数衰减 ==========
function local_loss_coefficient(Re, zeta_inf, Re_c_local = 10) {
  if (Re <= 0) return zeta_inf;
  return zeta_inf / (1.0 + Re_c_local / Re);
}

// ========== 管道雷诺修正系数 ==========
function pipe_FR(Re, d_m, rho, mu, eps_d, L_over_d, zeta_local = 0.0) {
  let f0;
  if (eps_d >= 0.001) {
    f0 = churchill_f(1e9, eps_d);
  } else {
    // 简化：直接取高Re极限
    f0 = churchill_f(1e9, eps_d);
  }
  const f_re = churchill_f(Re, eps_d);
  const K0 = f0 * L_over_d + zeta_local;
  const K_re = f_re * L_over_d + zeta_local;
  if (K_re <= 0) return 1.0;
  return Math.sqrt(K0 / K_re);
}

// ========== 单位转换 ==========
function convert_flow_to_mlmin(value, unit) {
  const map = {
    "ml/min": 1.0, "L/min": C.LPM2MLMIN, "m³/h": C.M3HR2MLMIN,
    "m³/s": C.M3S2MLMIN, "gal(US)/min": C.GPM2MLMIN,
    "μl/min": C.ULMIN2MLMIN, "ml/s": C.MLS2MLMIN, "μl/s": C.ULS2MLMIN
  };
  return value * (map[unit] || 1.0);
}

function convert_pressure_to_pa(value, unit) {
  const map = {
    "Pa": 1.0, "kPa": C.KPA2PA, "MPa": C.MPA2PA, "psi": C.PSI2PA,
    "bar": C.BAR2PA, "mbar": C.MBAR2PA, "atm": C.ATM2PA,
    "mmHg": C.MMHG2PA, "mmH₂O": C.MMH2O2PA
  };
  return value * (map[unit] || 1.0);
}

function convert_mlmin_to_unit(value_mlmin, unit) {
  const map = {
    "ml/min": 1.0, "L/min": C.LPM2MLMIN, "m³/h": C.M3HR2MLMIN,
    "m³/s": C.M3S2MLMIN, "gal(US)/min": C.GPM2MLMIN,
    "μl/min": C.ULMIN2MLMIN, "ml/s": C.MLS2MLMIN, "μl/s": C.ULS2MLMIN
  };
  return value_mlmin / (map[unit] || 1.0);
}

function convert_pa_to_unit(value_pa, unit) {
  const map = {
    "Pa": 1.0, "kPa": C.KPA2PA, "MPa": C.MPA2PA, "psi": C.PSI2PA,
    "bar": C.BAR2PA, "mbar": C.MBAR2PA, "atm": C.ATM2PA,
    "mmHg": C.MMHG2PA, "mmH₂O": C.MMH2O2PA
  };
  return value_pa / (map[unit] || 1.0);
}

// ========== 核心计算：已知流量求系统压降 ==========
function compute_system_with_flow(rows, flow_mlmin, fluid_type, temperature,
                                   user_rho, user_mu, user_nu, orifice_shape, cv_model) {
  let rho, nu, mu;
  if (fluid_type === "水") {
    rho = water_density(temperature);
    nu = water_kinematic_viscosity(temperature);
    mu = rho * nu;
  } else if (fluid_type === "空气") {
    rho = air_density(temperature);
    nu = air_kinematic_viscosity(temperature);
    mu = rho * nu;
  } else if (C.PRESET_FLUIDS[fluid_type]) {
    const preset = C.PRESET_FLUIDS[fluid_type];
    rho = preset.rho;
    mu = preset.mu;
    nu = mu / rho;
  } else {
    rho = user_rho;
    mu = user_mu;
    nu = user_nu > 0 ? user_nu : mu / rho;
  }

  const preset = C.ORIFICE_PRESETS[orifice_shape] || C.ORIFICE_PRESETS["锐边薄壁孔"];
  const Cd_inf = preset.Cd_inf;
  const Re_c = preset.Re_c;

  const results = [];
  const Re_list = [];
  let total_dPy = 0.0;
  let total_dPj = 0.0;

  rows.forEach(row => {
    const typ = row.type;
    const Q = flow_mlmin;
    const val = parseFloat(row.diameter_cv) || 0;
    const L = parseFloat(row.length) || 0;
    const xi = parseFloat(row.xi) || 0;
    const name_tag = row.name || "";
    const notes_tag = row.notes || "";

    const empty_result = {
      '流速(m/s)': null, '雷诺数Re': null, '沿程阻力系数λ': null,
      '层流底层(mm)': null, 'R(Pa/m)': null, 'ΔPy(Pa)': null,
      '动压(Pa)': null, 'ΔPj(Pa)': null, 'ΔPt(Pa)': null,
      'FR(Re)': null, '当量孔径(mm)': null, '当量Cv': null,
      'Name': name_tag, 'Notes': notes_tag
    };

    if (Q <= 0 || (typ !== "ID" && typ !== "Cv")) {
      results.push(empty_result);
      return;
    }

    if (typ === "ID") {
      if (val <= 0 || L <= 0) {
        results.push(empty_result);
        return;
      }
      const d_m = val / 1000.0;
      const L_m = L / 1000.0;
      const Q_m3s = Q / C.M3S2MLMIN;
      const calc = pressure_loss_along_length(Q_m3s, d_m, L_m, nu, rho);
      const u = calc.u;
      const Re = calc.Re;
      const lamda = calc.lamda;
      const dPy = calc.deltaP;
      const delta_mm = calc.thickness_laminar_floor * 1000;
      const R_val = calc.R;
      const dynP = 0.5 * rho * u * u;
      const xi_eff = local_loss_coefficient(Re, xi, 10);
      const dPj = xi_eff * dynP;
      const dPt = dPy + dPj;
      const Cv_eq = cv_equivalent(Q, dPt, rho);
      const f0 = churchill_f(1e9, 0.0);
      const FR_pipe = lamda > 0 ? Math.sqrt(f0 / lamda) : 1.0;
      Re_list.push(Re);
      results.push({
        '流速(m/s)': u, '雷诺数Re': Re, '沿程阻力系数λ': lamda,
        '层流底层(mm)': delta_mm, 'R(Pa/m)': R_val,
        'ΔPy(Pa)': dPy, '动压(Pa)': dynP, 'ΔPj(Pa)': dPj,
        'ΔPt(Pa)': dPt, 'FR(Re)': FR_pipe,
        '当量孔径(mm)': val, '当量Cv': Cv_eq,
        'Name': name_tag, 'Notes': notes_tag
      });
      total_dPy += dPy;
      total_dPj += dPj;
    } else { // Cv
      if (val <= 0) {
        results.push(empty_result);
        return;
      }
      let d_mm = 1.0;
      if (Cd_inf > 0) {
        d_mm = Math.sqrt(val / (0.04626 * Cd_inf));
      }
      if (d_mm <= 0) d_mm = 1.0;
      const dPj = cv_pressure_drop_corrected(Q, val, rho, mu, d_mm, Re_c);
      const dPt = dPj;
      const d_m = d_mm / 1000.0;
      const Q_m3s = Q / C.M3S2MLMIN;
      const A = C.pi * (d_m * d_m) / 4.0;
      const u = A > 0 ? Q_m3s / A : 0;
      let Re_val = 0;
      if (mu > 0 && d_m > 0) {
        Re_val = (4.0 * rho * Q_m3s) / (C.pi * d_m * mu);
      }
      let FR_val;
      if (cv_model === "管道沿程（Churchill 法）") {
        const f_work = churchill_f(Re_val, 0.0);
        const f0 = 0.00464;
        FR_val = f_work > 0 ? Math.sqrt(f0 / f_work) : 1.0;
      } else {
        FR_val = orifice_FR(Re_val, Re_c);
      }
      const Cv_eq = val * FR_val;
      Re_list.push(Re_val);
      results.push({
        '流速(m/s)': u > 0 ? u : null,
        '雷诺数Re': Re_val > 0 ? Re_val : null,
        '沿程阻力系数λ': null, '层流底层(mm)': null,
        'R(Pa/m)': null, 'ΔPy(Pa)': 0.0,
        '动压(Pa)': null, 'ΔPj(Pa)': dPj, 'ΔPt(Pa)': dPt,
        'FR(Re)': FR_val, '当量孔径(mm)': d_mm, '当量Cv': Cv_eq,
        'Name': name_tag, 'Notes': notes_tag
      });
      total_dPj += dPj;
    }
  });

  const total_dPt = total_dPy + total_dPj;
  return { total_dPt, results, total_dPy, total_dPj, Re_list };
}

// ========== 二分法反算流量 ==========
function find_flow_by_pressure(target_pa, rows, fluid_type, temperature,
                                user_rho, user_mu, user_nu, orifice_shape, cv_model) {
  if (target_pa <= 0) return { flow: 0.0, pressure: 0.0, error: 0.0 };

  let flow_min = 0.001;
  let flow_max = 10000.0;

  const calc = (flow) => compute_system_with_flow(rows, flow, fluid_type, temperature,
    user_rho, user_mu, user_nu, orifice_shape, cv_model).total_dPt;

  let p_low = calc(flow_min);
  let p_high = calc(flow_max);

  if (p_low > target_pa) {
    return { flow: flow_min, pressure: p_low, error: p_low - target_pa };
  }

  while (p_high < target_pa && flow_max < 1e8) {
    flow_max *= 2;
    p_high = calc(flow_max);
  }

  let flow_low = flow_min;
  for (let i = 0; i < 200; i++) {
    const flow_mid = (flow_low + flow_max) / 2.0;
    const p_mid = calc(flow_mid);
    if (Math.abs(p_mid - target_pa) < Math.max(1.0, 1e-5 * target_pa)) {
      return { flow: flow_mid, pressure: p_mid, error: p_mid - target_pa };
    }
    if (p_mid > target_pa) {
      flow_max = flow_mid;
    } else {
      flow_low = flow_mid;
    }
  }

  const flow_final = (flow_low + flow_max) / 2.0;
  const p_final = calc(flow_final);
  return { flow: flow_final, pressure: p_final, error: p_final - target_pa };
}

// ========== 生成 PQ 曲线 ==========
function generate_pq_curve(rows, fluid_type, temperature, user_rho, user_mu, user_nu,
                            orifice_shape, cv_model, Q_center, num_points = 200) {
  let Q_min = Q_center * Math.pow(10, -0.5);
  let Q_max = Q_center * Math.pow(10, 0.5);
  if (Q_min <= 0) Q_min = 0.001;

  // 对数均匀采样
  const logMin = Math.log10(Q_min);
  const logMax = Math.log10(Q_max);
  const data = [];

  for (let i = 0; i < num_points; i++) {
    const Q = Math.pow(10, logMin + (logMax - logMin) * i / (num_points - 1));
    const result = compute_system_with_flow(rows, Q, fluid_type, temperature,
      user_rho, user_mu, user_nu, orifice_shape, cv_model);
    const valid_Re = result.Re_list.filter(r => r != null && r > 0);
    const Re_min = valid_Re.length > 0 ? Math.min(...valid_Re) : 0;
    const Re_max = valid_Re.length > 0 ? Math.max(...valid_Re) : 0;
    data.push({ Q, dP: result.total_dPt, Re_min, Re_max });
  }

  // 一阶差分判断非单调
  for (let i = 1; i < data.length; i++) {
    data[i].dP_diff = data[i].dP - data[i - 1].dP;
  }
  data[0].dP_diff = 0;

  const result_df = data.map((d, i) => ({
    ...d,
    is_non_monotonic: (i > 0 && d.dP_diff < 0) || (i < data.length - 1 && data[i + 1].dP_diff < 0),
    K: d.Q > 0 ? d.dP / (d.Q * d.Q) : null
  }));

  return result_df;
}

// ========== 多项式拟合 ==========
function fit_polynomial(Q_array, dP_array, Q_work) {
  const n = Q_array.length;
  if (n < 4) return { coeffs: [0], degree: 1, metrics: { r2: 0, r2_adj: 0, rmse: 0, mae: 0 } };

  // 归一化到工作点
  const x = Q_array.map(q => q / Q_work);
  const y = dP_array;

  let best_degree = null;
  let best_coeffs = null;
  let best_adj_r2 = -Infinity;

  for (let deg = 3; deg <= 5; deg++) {
    if (n < deg + 1) continue;
    try {
      const coeffs_norm = polyfit(x, y, deg);
      const y_pred = x.map(xi => polyval(coeffs_norm, xi));
      const ss_res = y.reduce((sum, yi, i) => sum + Math.pow(yi - y_pred[i], 2), 0);
      const y_mean = y.reduce((a, b) => a + b, 0) / n;
      const ss_tot = y.reduce((sum, yi) => sum + Math.pow(yi - y_mean, 2), 0);
      const r2 = ss_tot > 0 ? 1 - ss_res / ss_tot : 0;
      const adj_r2 = n > deg + 1 ? 1 - (1 - r2) * (n - 1) / (n - deg - 1) : r2;

      if (adj_r2 - best_adj_r2 > 0.0001) {
        best_adj_r2 = adj_r2;
        best_degree = deg;
        best_coeffs = coeffs_norm;
      }
    } catch (e) {
      continue;
    }
  }

  if (best_degree === null) {
    best_degree = 1;
    best_coeffs = polyfit(x, y, 1);
  }

  // 转换为直接系数
  const coeffs_direct = best_coeffs.map((a, i) => {
    const power = best_degree - i;
    return power === 0 ? a : a / Math.pow(Q_work, power);
  });

  // 计算指标
  const y_pred = x.map(xi => polyval(best_coeffs, xi));
  const residuals = y.map((yi, i) => yi - y_pred[i]);
  const ss_res = residuals.reduce((sum, r) => sum + r * r, 0);
  const y_mean = y.reduce((a, b) => a + b, 0) / n;
  const ss_tot = y.reduce((sum, yi) => sum + Math.pow(yi - y_mean, 2), 0);
  const r2 = ss_tot > 0 ? 1 - ss_res / ss_tot : 0;
  const adj_r2 = n > best_degree + 1 ? 1 - (1 - r2) * (n - 1) / (n - best_degree - 1) : r2;
  const rmse = Math.sqrt(residuals.reduce((s, r) => s + r * r, 0) / n);
  const mae = residuals.reduce((s, r) => s + Math.abs(r), 0) / n;

  return {
    coeffs: coeffs_direct,
    degree: best_degree,
    metrics: { r2, r2_adj: adj_r2, rmse, mae }
  };
}

// 多项式拟合（最小二乘法）
function polyfit(x, y, degree) {
  const n = x.length;
  // 构建 Vandermonde 矩阵
  const A = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = degree; j >= 0; j--) {
      row.push(Math.pow(x[i], j));
    }
    A.push(row);
  }
  // 使用正规方程求解: (A^T * A) * c = A^T * y
  const AT = transpose(A);
  const ATA = multiply(AT, A);
  const ATy = multiplyVec(AT, y);
  const coeffs = solve(ATA, ATy);
  return coeffs;
}

function polyval(coeffs, x) {
  let result = 0;
  for (let i = 0; i < coeffs.length; i++) {
    result = result * x + coeffs[i];
  }
  return result;
}

// 矩阵运算辅助函数
function transpose(A) {
  const rows = A.length, cols = A[0].length;
  const result = [];
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = A[i][j];
    }
  }
  return result;
}

function multiply(A, B) {
  const rows = A.length, cols = B[0].length, inner = B.length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      for (let k = 0; k < inner; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function multiplyVec(A, v) {
  return A.map(row => row.reduce((sum, a, j) => sum + a * v[j], 0));
}

// 高斯消元求解线性方程组
function solve(A, b) {
  const n = A.length;
  const augmented = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    // 选主元
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(augmented[j][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = j;
      }
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

    if (Math.abs(augmented[i][i]) < 1e-15) {
      augmented[i][i] = 1e-15;
    }

    for (let j = i + 1; j < n; j++) {
      const factor = augmented[j][i] / augmented[i][i];
      for (let k = i; k <= n; k++) {
        augmented[j][k] -= factor * augmented[i][k];
      }
    }
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = augmented[i][n];
    for (let j = i + 1; j < n; j++) {
      x[i] -= augmented[i][j] * x[j];
    }
    x[i] /= augmented[i][i];
  }
  return x;
}

// ========== 数值格式化 ==========
function fmt_num(value, precision = 2) {
  if (value === null || value === undefined || value === '') return '';
  const v = parseFloat(value);
  if (isNaN(v)) return String(value);
  if (v === 0) return '0';
  if (Math.abs(v) >= 1000 || Math.abs(v) < 0.001) {
    return v.toExponential(precision);
  }
  return v.toFixed(precision);
}

// ========== 流态判断 ==========
function get_flow_regime(Re) {
  if (Re === null || Re === undefined || isNaN(Re)) return '';
  if (Re < C.Re_th_1) return '层流';
  if (Re < C.Re_th_2) return '过渡区';
  return '湍流';
}

module.exports = {
  churchill_f,
  water_density, water_dynamic_viscosity, water_kinematic_viscosity,
  air_density, air_dynamic_viscosity, air_kinematic_viscosity,
  pressure_loss_along_length,
  orifice_FR, pipe_FR,
  cv_pressure_drop, cv_equivalent, cv_pressure_drop_corrected,
  local_loss_coefficient,
  compute_system_with_flow, find_flow_by_pressure, generate_pq_curve,
  fit_polynomial, polyval,
  convert_flow_to_mlmin, convert_pressure_to_pa,
  convert_mlmin_to_unit, convert_pa_to_unit,
  fmt_num, get_flow_regime
};
