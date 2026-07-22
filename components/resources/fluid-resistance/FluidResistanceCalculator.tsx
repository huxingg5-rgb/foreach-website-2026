"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import constants from "@/lib/fluid-resistance/source/constants.js";
import calculator, {
  type CalculationResultRow,
  type PolynomialFit,
  type PQPoint,
  type SourceRow,
} from "@/lib/fluid-resistance/source/fluid_calc.js";

import styles from "./FluidResistanceCalculator.module.css";
import {
  localizeFlowRegime,
  localizeFluidDescription,
  localizeFluidName,
  localizeOrificeName,
  translateFluidResistanceText,
} from "@/data/resources/fluid-resistance/fluid-resistance.intl";

type FluidResistanceCalculatorProps = {
  locale?: string;
};

type InputRow = SourceRow & {
  id: number;
  flow: string;
};

type ResultRow = {
  source: InputRow;
  raw: CalculationResultRow;
  flow: string;
  regime: string;
};

type FluidProperties = {
  rho: number;
  mu: number;
  nu: number;
  description: string;
};

type Statistics = {
  totalDPy: number;
  totalDPj: number;
  totalDPt: number;
  overallCv: number;
  waterDPy: number;
  waterDPj: number;
  waterDPt: number;
  waterCv: number;
  deltaDPy: number;
  deltaDPj: number;
  deltaDPt: number;
  deltaCv: number;
  localRatio: number;
  maxDampSource: {
    index: number;
    type: string;
    name: string;
    dPt: number;
    ratio: number;
  } | null;
  minCvSource: {
    index: number;
    type: string;
    name: string;
    cv: number;
  } | null;
};

type PolynomialData = {
  fit: PolynomialFit;
  formula: string;
  qMin: number;
  qMax: number;
  samples: Array<{ q: number; pressure: number; predicted: number; residual: number }>;
};

type CalculationState = {
  summary: string;
  currentFlow: number;
  resultRows: ResultRow[];
  statistics: Statistics;
  pqData: PQPoint[];
  polynomial: PolynomialData;
};

type ActiveTab = "results" | "statistics" | "pq" | "polynomial";

const FLOW_UNITS = [
  "ml/min",
  "L/min",
  "m³/h",
  "m³/s",
  "gal(US)/min",
  "μl/min",
  "ml/s",
  "μl/s",
] as const;

const PRESSURE_UNITS = [
  "Pa",
  "kPa",
  "MPa",
  "psi",
  "bar",
  "mbar",
  "atm",
  "mmHg",
  "mmH₂O",
] as const;

const CV_MODELS = ["小孔节流（Cd 法）", "管道沿程（Churchill 法）"] as const;
const CALCULATION_MODES = ["已知流量（求压降）", "已知压降（求流量）"] as const;
const VISCOSITY_MODES = ["动力黏度", "运动黏度"] as const;
const CUSTOM_FLUID = "其它自定义";

const DEFAULT_ROWS: InputRow[] = [
  { id: 1, type: "ID", flow: "100.0", diameter_cv: "1.0", length: "100.0", xi: "0.0", name: "管路", notes: "管路备注" },
  { id: 2, type: "ID", flow: "100.0", diameter_cv: "0.8", length: "100.0", xi: "0.0", name: "管路", notes: "管路备注" },
  { id: 3, type: "ID", flow: "100.0", diameter_cv: "0.5", length: "100.0", xi: "0.0", name: "管路", notes: "管路备注" },
  { id: 4, type: "Cv", flow: "100.0", diameter_cv: "0.02", length: "0.0", xi: "0.0", name: "阀或阻尼", notes: "阻尼备注" },
  { id: 5, type: "Cv", flow: "100.0", diameter_cv: "0.01", length: "0.0", xi: "0.0", name: "阀或阻尼", notes: "阻尼备注" },
];

const RESULT_COLUMNS = [
  "序号",
  "类型",
  "流量(ml/min)",
  "内径(mm)/Cv",
  "管长(mm)",
  "局部阻力系数ξ",
  "流速(m/s)",
  "雷诺数Re",
  "沿程阻力系数λ",
  "层流底层(mm)",
  "R(Pa/m)",
  "ΔPy(Pa)",
  "动压(Pa)",
  "ΔPj(Pa)",
  "ΔPt(Pa)",
  "FR(Re)",
  "当量孔径(mm)",
  "当量Cv",
  "流态",
  "Name",
  "Notes",
] as const;

const RESULT_COLUMNS_EN = [
  "No.",
  "Type",
  "Flow (ml/min)",
  "ID (mm)/Cv",
  "Length (mm)",
  "Local Resistance Coefficient ξ",
  "Velocity (m/s)",
  "Reynolds Number Re",
  "Friction Factor λ",
  "Laminar Sublayer (mm)",
  "R (Pa/m)",
  "ΔPy (Pa)",
  "Dynamic Pressure (Pa)",
  "ΔPj (Pa)",
  "ΔPt (Pa)",
  "FR (Re)",
  "Equivalent Orifice (mm)",
  "Equivalent Cv",
  "Flow Regime",
  "Name",
  "Notes",
] as const;

const FLUID_NAME_EN: Record<string, string> = {
  水: "Water",
  空气: "Air",
  "PBS 缓冲液": "PBS Buffer",
  "血液（全血）": "Whole Blood",
  血浆: "Plasma",
  血清: "Serum",
  "尿液（模拟）": "Simulated Urine",
  脑脊液: "Cerebrospinal Fluid",
  "DMEM 培养基": "DMEM Medium",
  "RPMI 1640 培养基": "RPMI 1640 Medium",
  乙醇: "Ethanol",
  "异丙醇 (IPA)": "Isopropyl Alcohol (IPA)",
  丙酮: "Acetone",
  "L-HM 46 抗磨液压油": "L-HM 46 Anti-Wear Hydraulic Oil",
  "L-HM 68 抗磨液压油": "L-HM 68 Anti-Wear Hydraulic Oil",
  "L-TSA 46 汽轮机油": "L-TSA 46 Turbine Oil",
  "L-AN 100 全损耗系统用油": "L-AN 100 Total-Loss System Oil",
  "导轨油 68": "Slideway Oil 68",
  "甲基硅油 5cSt": "Methyl Silicone Oil 5 cSt",
  "甲基硅油 10cSt": "Methyl Silicone Oil 10 cSt",
  "甲基硅油 50cSt": "Methyl Silicone Oil 50 cSt",
  "甲基硅油 100cSt": "Methyl Silicone Oil 100 cSt",
  "甲基硅油 350cSt": "Methyl Silicone Oil 350 cSt",
  "甲基硅油 1000cSt": "Methyl Silicone Oil 1000 cSt",
  "氟硅油 300cSt": "Fluorosilicone Oil 300 cSt",
  "苯基硅油 500cSt": "Phenyl Silicone Oil 500 cSt",
  矿物油: "Mineral Oil",
  "FC-40": "FC-40",
  "HFE-7500": "HFE-7500",
  "全氟聚醚 PFPE": "Perfluoropolyether (PFPE)",
  "Galden HT135": "Galden HT135",
  "PAO 4 合成基础油": "PAO 4 Synthetic Base Oil",
  "PAO 40 合成基础油": "PAO 40 Synthetic Base Oil",
  矿物润滑脂基油: "Mineral Grease Base Oil",
  "Tween-20 水溶液 1%": "Tween-20 Aqueous Solution 1%",
  "SDS 水溶液 1%": "SDS Aqueous Solution 1%",
  "甘油水溶液 50%": "Glycerol Aqueous Solution 50%",
  甘油: "Glycerol",
  "Polyacrylamide 0.1%": "Polyacrylamide 0.1%",
  [CUSTOM_FLUID]: "Other / Custom",
};

const FLUID_DESCRIPTION_EN: Record<string, string> = {
  "PBS 缓冲液": "Phosphate-buffered saline",
  "血液（全血）": "Human whole blood, Hct = 45%",
  血浆: "Human plasma at 37°C",
  血清: "Human serum at 37°C",
  "尿液（模拟）": "Artificial urine",
  脑脊液: "Artificial cerebrospinal fluid",
  "DMEM 培养基": "Contains 10% FBS",
  "RPMI 1640 培养基": "Suspension cell culture",
  乙醇: "Anhydrous ethanol",
  "异丙醇 (IPA)": "Commonly used for microfluidic cleaning",
  丙酮: "Low-viscosity solvent",
  "L-HM 46 抗磨液压油": "General hydraulic systems",
  "L-HM 68 抗磨液压油": "High-pressure hydraulic systems",
  "L-TSA 46 汽轮机油": "High-speed rotating machinery",
  "L-AN 100 全损耗系统用油": "General machinery lubrication",
  "导轨油 68": "Machine-tool slideways and micro-motion stages",
  "甲基硅油 5cSt": "Low-viscosity silicone oil",
  "甲基硅油 10cSt": "Low-viscosity silicone oil",
  "甲基硅油 50cSt": "Continuous phase for microfluidics",
  "甲基硅油 100cSt": "Continuous phase for microfluidics",
  "甲基硅油 350cSt": "Medium-viscosity damping fluid",
  "甲基硅油 1000cSt": "High-viscosity damping fluid",
  "氟硅油 300cSt": "Solvent-resistant sealing and wide-temperature lubrication",
  "苯基硅油 500cSt": "High-temperature, high-vacuum lubrication",
  矿物油: "Continuous phase for digital PCR",
  "FC-40": "3M fluorocarbon oil",
  "HFE-7500": "3M fluorocarbon oil for digital PCR",
  "全氟聚醚 PFPE": "For strong oxidants and semiconductor applications",
  "Galden HT135": "Vapor-phase soldering and cooling fluid",
  "PAO 4 合成基础油": "Synthetic grease base oil",
  "PAO 40 合成基础油": "High-viscosity synthetic grease base oil",
  矿物润滑脂基油: "General lithium grease base oil",
  "Tween-20 水溶液 1%": "Microfluidic surfactant",
  "SDS 水溶液 1%": "Electrophoresis buffer",
  "甘油水溶液 50%": "Glycerol:water = 1:1",
  甘油: "Pure glycerol at 20°C",
  "Polyacrylamide 0.1%": "Simulated high-viscosity biological fluid",
};

const ORIFICE_NAME_EN: Record<string, string> = {
  锐边薄壁孔: "Sharp-Edged Thin Orifice",
  "45°倒角": "45° Chamfer",
  "圆角 r/d=0.1": "Rounded Edge r/d = 0.1",
  "圆角 r/d=0.2": "Rounded Edge r/d = 0.2",
  "全圆角(喷嘴)": "Fully Rounded Nozzle",
};

const REGIME_EN: Record<string, string> = {
  层流: "Laminar",
  过渡区: "Transitional",
  湍流: "Turbulent",
};

function localizedName(value: string, locale?: string) {
  return localizeFluidName(locale, value, FLUID_NAME_EN[value] ?? value);
}

function toNumber(value: string | number | null | undefined, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizedType(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "id") return "ID";
  if (normalized === "cv") return "Cv";
  return value.trim();
}

function formatFormula(fit: PolynomialFit) {
  const terms: string[] = [];

  fit.coeffs.forEach((coefficient, index) => {
    if (Math.abs(coefficient) < 1e-12) return;
    const power = fit.degree - index;
    const coefficientText =
      Math.abs(coefficient) >= 1000 || Math.abs(coefficient) < 0.001
        ? coefficient.toExponential(6)
        : coefficient.toFixed(6);

    if (power === 0) terms.push(coefficientText);
    else if (power === 1) terms.push(`${coefficientText} * Q`);
    else terms.push(`${coefficientText} * Q^${power}`);
  });

  return `dP(Q) = ${terms.join(" + ").replace(/\+ -/g, "- ")}`;
}

function formatValue(value: number | string | null | undefined, precision = 2) {
  if (typeof value === "string") return value;
  return calculator.fmt_num(value, precision);
}

type ChartAxis = {
  min: number;
  max: number;
  ticks: number[];
  exponent: number;
};

function niceTickStep(rawStep: number) {
  if (!Number.isFinite(rawStep) || rawStep <= 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const fraction = rawStep / magnitude;
  const niceFraction =
    fraction < 1.5 ? 1 : fraction < 3 ? 2 : fraction < 7 ? 5 : 10;
  return niceFraction * magnitude;
}

function buildAutoAxis(values: number[], targetTickCount = 8): ChartAxis {
  const finiteValues = values.filter(Number.isFinite);
  if (!finiteValues.length) {
    return { min: 0, max: 1, ticks: [0, 0.2, 0.4, 0.6, 0.8, 1], exponent: 0 };
  }

  let dataMin = Math.min(...finiteValues);
  let dataMax = Math.max(...finiteValues);
  if (dataMin === dataMax) {
    const fallback = Math.abs(dataMin) > 0 ? Math.abs(dataMin) * 0.05 : 1;
    dataMin -= fallback;
    dataMax += fallback;
  }

  const dataSpan = dataMax - dataMin;
  const min = dataMin - dataSpan * 0.05;
  const max = dataMax + dataSpan * 0.05;
  const step = niceTickStep((max - min) / Math.max(targetTickCount - 1, 1));
  const tickStart = Math.ceil((min - step * 1e-10) / step) * step;
  const tickEnd = Math.floor((max + step * 1e-10) / step) * step;
  const ticks: number[] = [];

  for (let value = tickStart, guard = 0; value <= tickEnd + step * 1e-8 && guard < 100; value += step, guard += 1) {
    ticks.push(Math.abs(value) < step * 1e-10 ? 0 : value);
  }

  if (!ticks.length) ticks.push(dataMin, dataMax);

  const maxAbs = Math.max(Math.abs(dataMin), Math.abs(dataMax));
  const exponent = maxAbs > 0 ? Math.floor(Math.log10(maxAbs)) : 0;
  return {
    min,
    max,
    ticks,
    exponent: exponent <= -3 || exponent >= 4 ? exponent : 0,
  };
}

function formatScientificAxisTick(value: number, exponent: number) {
  if (!Number.isFinite(value)) return "0";
  const scaled = exponent ? value / Math.pow(10, exponent) : value;
  if (Math.abs(scaled) < 1e-12) return "0";
  const absolute = Math.abs(scaled);
  const maximumFractionDigits = absolute >= 10 ? 0 : absolute >= 1 ? 1 : 2;
  return new Intl.NumberFormat("zh-CN", { maximumFractionDigits }).format(scaled);
}

function solveScaledLeastSquares(matrix: number[][], values: number[]) {
  const rowCount = matrix.length;
  const columnCount = matrix[0]?.length ?? 0;
  if (!rowCount || !columnCount || values.length !== rowCount) return [];

  // NumPy polyfit first scales each Vandermonde column, then solves the
  // least-squares system with an SVD. One-sided Jacobi SVD is stable and
  // deterministic for the small 18 x 4/5/6 systems used by this calculator.
  const columnScales = Array.from({ length: columnCount }, (_, column) => {
    const sumSquares = matrix.reduce((sum, row) => sum + row[column] ** 2, 0);
    return Math.sqrt(sumSquares) || 1;
  });
  const working = matrix.map((row) =>
    row.map((value, column) => value / columnScales[column]),
  );
  const rightVectors: number[][] = Array.from({ length: columnCount }, (_, row) =>
    Array.from({ length: columnCount }, (_, column) => (row === column ? 1 : 0)),
  );

  for (let sweep = 0; sweep < 100; sweep += 1) {
    let changed = false;

    for (let left = 0; left < columnCount - 1; left += 1) {
      for (let right = left + 1; right < columnCount; right += 1) {
        let alpha = 0;
        let beta = 0;
        let gamma = 0;

        for (let row = 0; row < rowCount; row += 1) {
          const leftValue = working[row][left];
          const rightValue = working[row][right];
          alpha += leftValue * leftValue;
          beta += rightValue * rightValue;
          gamma += leftValue * rightValue;
        }

        if (
          Math.abs(gamma) <=
          Number.EPSILON * Math.sqrt(Math.max(alpha * beta, 0)) * rowCount
        ) {
          continue;
        }

        changed = true;
        const tau = (beta - alpha) / (2 * gamma);
        const tangent =
          (tau >= 0 ? 1 : -1) /
          (Math.abs(tau) + Math.sqrt(1 + tau * tau));
        const cosine = 1 / Math.sqrt(1 + tangent * tangent);
        const sine = cosine * tangent;

        for (let row = 0; row < rowCount; row += 1) {
          const leftValue = working[row][left];
          const rightValue = working[row][right];
          working[row][left] = cosine * leftValue - sine * rightValue;
          working[row][right] = sine * leftValue + cosine * rightValue;
        }

        for (let row = 0; row < columnCount; row += 1) {
          const leftValue = rightVectors[row][left];
          const rightValue = rightVectors[row][right];
          rightVectors[row][left] = cosine * leftValue - sine * rightValue;
          rightVectors[row][right] = sine * leftValue + cosine * rightValue;
        }
      }
    }

    if (!changed) break;
  }

  const singularValuesSquared = Array.from({ length: columnCount }, (_, column) =>
    working.reduce((sum, row) => sum + row[column] ** 2, 0),
  );
  const largestSingularValue = Math.sqrt(Math.max(...singularValuesSquared, 0));
  const cutoff = largestSingularValue * rowCount * Number.EPSILON;
  const projected = singularValuesSquared.map((singularValueSquared, column) => {
    if (Math.sqrt(singularValueSquared) <= cutoff) return 0;
    const numerator = working.reduce(
      (sum, row, rowIndex) => sum + row[column] * values[rowIndex],
      0,
    );
    return numerator / singularValueSquared;
  });
  const scaledSolution = Array.from({ length: columnCount }, (_, row) =>
    rightVectors[row].reduce(
      (sum, rightVector, column) => sum + rightVector * projected[column],
      0,
    ),
  );

  return scaledSolution.map((value, column) => value / columnScales[column]);
}

function fitPolynomialLikeDesktop(
  flows: number[],
  pressureDrops: number[],
  workFlow: number,
): PolynomialFit {
  const normalizedFlows = flows.map((flow) => flow / workFlow);
  const sampleCount = flows.length;
  let bestFit: PolynomialFit | null = null;
  let bestAdjustedR2 = Number.NEGATIVE_INFINITY;

  [3, 4, 5].forEach((degree) => {
    if (sampleCount < degree + 1) return;
    const vandermonde = normalizedFlows.map((flow) =>
      Array.from({ length: degree + 1 }, (_, index) => flow ** (degree - index)),
    );
    const normalizedCoefficients = solveScaledLeastSquares(vandermonde, pressureDrops);
    if (normalizedCoefficients.length !== degree + 1) return;

    const normalizedPredictions = normalizedFlows.map((flow) =>
      calculator.polyval(normalizedCoefficients, flow),
    );
    const averagePressure =
      pressureDrops.reduce((sum, pressure) => sum + pressure, 0) / sampleCount;
    const residualSumSquares = pressureDrops.reduce((sum, pressure, index) => {
      const residual = pressure - normalizedPredictions[index];
      return sum + residual * residual;
    }, 0);
    const totalSumSquares = pressureDrops.reduce((sum, pressure) => {
      const delta = pressure - averagePressure;
      return sum + delta * delta;
    }, 0);
    const r2 = totalSumSquares > 0 ? 1 - residualSumSquares / totalSumSquares : 0;
    const adjustedR2 =
      sampleCount > degree + 1
        ? 1 - ((1 - r2) * (sampleCount - 1)) / (sampleCount - degree - 1)
        : r2;

    if (adjustedR2 - bestAdjustedR2 <= 0.0001) return;

    const residuals = pressureDrops.map(
      (pressure, index) => pressure - normalizedPredictions[index],
    );
    const coefficients = normalizedCoefficients.map(
      (coefficient, index) => coefficient / workFlow ** (degree - index),
    );
    bestAdjustedR2 = adjustedR2;
    bestFit = {
      coeffs: coefficients,
      degree,
      metrics: {
        r2,
        r2_adj: adjustedR2,
        rmse: Math.sqrt(
          residuals.reduce((sum, residual) => sum + residual * residual, 0) /
            sampleCount,
        ),
        mae:
          residuals.reduce((sum, residual) => sum + Math.abs(residual), 0) /
          sampleCount,
      },
    };
  });

  if (bestFit) return bestFit;

  const fallbackMatrix = normalizedFlows.map((flow) => [flow, 1]);
  const normalizedCoefficients = solveScaledLeastSquares(fallbackMatrix, pressureDrops);
  const predictions = normalizedFlows.map((flow) =>
    calculator.polyval(normalizedCoefficients, flow),
  );
  const averagePressure =
    pressureDrops.reduce((sum, pressure) => sum + pressure, 0) / sampleCount;
  const residuals = pressureDrops.map((pressure, index) => pressure - predictions[index]);
  const residualSumSquares = residuals.reduce(
    (sum, residual) => sum + residual * residual,
    0,
  );
  const totalSumSquares = pressureDrops.reduce((sum, pressure) => {
    const delta = pressure - averagePressure;
    return sum + delta * delta;
  }, 0);
  const r2 = totalSumSquares > 0 ? 1 - residualSumSquares / totalSumSquares : 0;

  return {
    coeffs: [normalizedCoefficients[0] / workFlow, normalizedCoefficients[1]],
    degree: 1,
    metrics: {
      r2,
      r2_adj: r2,
      rmse: Math.sqrt(residualSumSquares / sampleCount),
      mae:
        residuals.reduce((sum, residual) => sum + Math.abs(residual), 0) /
        sampleCount,
    },
  };
}

function buildFluidProperties(
  fluidType: string,
  temperature: number,
  customRho: number,
  customViscosity: number,
  viscosityMode: (typeof VISCOSITY_MODES)[number],
): FluidProperties {
  if (fluidType === "水") {
    const rho = calculator.water_density(temperature);
    const nu = calculator.water_kinematic_viscosity(temperature);
    return { rho, mu: rho * nu, nu, description: "" };
  }

  if (fluidType === "空气") {
    const rho = calculator.air_density(temperature);
    const nu = calculator.air_kinematic_viscosity(temperature);
    return { rho, mu: rho * nu, nu, description: "" };
  }

  const preset = constants.PRESET_FLUIDS[fluidType];
  if (preset) {
    return { rho: preset.rho, mu: preset.mu, nu: preset.mu / preset.rho, description: preset.desc };
  }

  if (viscosityMode === "动力黏度") {
    return {
      rho: customRho,
      mu: customViscosity,
      nu: customRho > 0 ? customViscosity / customRho : 0,
      description: "",
    };
  }

  return {
    rho: customRho,
    mu: customViscosity * customRho,
    nu: customViscosity,
    description: "",
  };
}

function calculateStatistics(
  rows: InputRow[],
  resultRows: ResultRow[],
  currentFlow: number,
  properties: FluidProperties,
  orificeShape: string,
  totalDPy: number,
  totalDPj: number,
  totalDPt: number,
): Statistics {
  const qUsGallons = currentFlow / constants.GPM2MLMIN;
  const overallCv =
    totalDPt > 0
      ? qUsGallons * Math.sqrt(properties.rho / 1000 / (totalDPt / constants.PSI2PA))
      : 0;

  const rhoWater = calculator.water_density(20);
  const nuWater = calculator.water_kinematic_viscosity(20);
  const muWater = rhoWater * nuWater;
  const orifice = constants.ORIFICE_PRESETS[orificeShape] ?? constants.ORIFICE_PRESETS["锐边薄壁孔"];
  let waterDPy = 0;
  let waterDPj = 0;

  rows.forEach((row) => {
    const type = normalizedType(row.type);
    const value = toNumber(row.diameter_cv);
    const length = toNumber(row.length);

    if (type === "ID" && value > 0 && length > 0) {
      const along = calculator.pressure_loss_along_length(
        currentFlow / constants.M3S2MLMIN,
        value / 1000,
        length / 1000,
        nuWater,
        rhoWater,
      );
      waterDPy += along.deltaP;
    } else if (type === "Cv" && value > 0) {
      const equivalentDiameter =
        orifice.Cd_inf > 0
          ? Math.sqrt(value / (constants.CV_TO_DIAMETER_COEFF * orifice.Cd_inf))
          : 1;
      waterDPj += calculator.cv_pressure_drop_corrected(
        currentFlow,
        value,
        rhoWater,
        muWater,
        equivalentDiameter,
        orifice.Re_c,
      );
    }
  });

  const waterDPt = waterDPy + waterDPj;
  const waterCv =
    waterDPt > 0
      ? qUsGallons * Math.sqrt(rhoWater / 1000 / (waterDPt / constants.PSI2PA))
      : 0;

  let maxDampSource: Statistics["maxDampSource"] = null;
  let minCvSource: Statistics["minCvSource"] = null;

  resultRows.forEach((row, index) => {
    const pressure = toNumber(row.raw["ΔPt(Pa)"]);
    const cv = toNumber(row.raw["当量Cv"]);

    if (!maxDampSource || pressure > maxDampSource.dPt) {
      maxDampSource = {
        index: index + 1,
        type: normalizedType(row.source.type),
        name: row.source.name ?? "",
        dPt: pressure,
        ratio: totalDPt > 0 ? (pressure / totalDPt) * 100 : 0,
      };
    }

    if (cv > 0 && (!minCvSource || cv < minCvSource.cv)) {
      minCvSource = {
        index: index + 1,
        type: normalizedType(row.source.type),
        name: row.source.name ?? "",
        cv,
      };
    }
  });

  return {
    totalDPy,
    totalDPj,
    totalDPt,
    overallCv,
    waterDPy,
    waterDPj,
    waterDPt,
    waterCv,
    deltaDPy: waterDPy !== 0 ? ((totalDPy - waterDPy) / waterDPy) * 100 : 0,
    deltaDPj: waterDPj !== 0 ? ((totalDPj - waterDPj) / waterDPj) * 100 : 0,
    deltaDPt: waterDPt !== 0 ? ((totalDPt - waterDPt) / waterDPt) * 100 : 0,
    deltaCv: waterCv !== 0 ? ((overallCv - waterCv) / waterCv) * 100 : 0,
    localRatio: totalDPt > 0 ? (totalDPj / totalDPt) * 100 : 0,
    maxDampSource,
    minCvSource,
  };
}

function makePolynomial(
  rows: InputRow[],
  currentFlow: number,
  fluidType: string,
  temperature: number,
  properties: FluidProperties,
  orificeShape: string,
  cvModel: string,
): PolynomialData {
  const qMin = currentFlow * Math.pow(10, -0.5);
  const qMax = currentFlow * Math.pow(10, 0.5);
  const logMin = Math.log10(Math.max(qMin, 0.001));
  const logMax = Math.log10(qMax);
  const flows = Array.from({ length: 18 }, (_, index) =>
    Math.pow(10, logMin + ((logMax - logMin) * index) / 17),
  );
  const pressureDrops = flows.map(
    (flow) =>
      calculator.compute_system_with_flow(
        rows,
        flow,
        fluidType,
        temperature,
        properties.rho,
        properties.mu,
        properties.nu,
        orificeShape,
        cvModel,
      ).total_dPt,
  );
  const fit = fitPolynomialLikeDesktop(flows, pressureDrops, currentFlow);
  const samples = flows.map((q, index) => {
    const predicted = calculator.polyval(fit.coeffs, q);
    return {
      q,
      pressure: pressureDrops[index],
      predicted,
      residual: pressureDrops[index] - predicted,
    };
  });

  return { fit, formula: formatFormula(fit), qMin, qMax, samples };
}

function metricQuality(fit: PolynomialFit, locale?: string) {
  if (fit.metrics.r2 >= 0.999) return translateFluidResistanceText(locale, "Excellent", "极佳");
  if (fit.metrics.r2 >= 0.99) return translateFluidResistanceText(locale, "Good", "良好");
  return translateFluidResistanceText(locale, "Fair", "一般");
}

const CHART_WIDTH = 1200;
const CHART_MARGIN = { top: 42, right: 28, bottom: 62, left: 82 };

function getChartScale(xMin: number, xMax: number, yMin: number, yMax: number, height: number) {
  const plotWidth = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right;
  const plotHeight = height - CHART_MARGIN.top - CHART_MARGIN.bottom;
  return {
    plotWidth,
    plotHeight,
    x: (value: number) => CHART_MARGIN.left + ((value - xMin) / (xMax - xMin || 1)) * plotWidth,
    y: (value: number) => CHART_MARGIN.top + plotHeight - ((value - yMin) / (yMax - yMin || 1)) * plotHeight,
  };
}

function PQChart({
  data,
  polynomial,
  currentFlow,
  currentPressure,
  locale,
}: {
  data: PQPoint[];
  polynomial: PolynomialData;
  currentFlow: number;
  currentPressure: number;
  locale?: string;
}) {
  const height = 390;
  const sampledQMin = Math.min(...data.map((point) => point.Q));
  const sampledQMax = Math.max(...data.map((point) => point.Q));
  const fitFlows = Array.from({ length: 200 }, (_, index) =>
    sampledQMin + ((sampledQMax - sampledQMin) * index) / 199,
  );
  const fitPressures = fitFlows.map((flow) =>
    calculator.polyval(polynomial.fit.coeffs, flow),
  );
  const xAxis = buildAutoAxis([
    ...data.map((point) => point.Q),
    ...fitFlows,
    currentFlow,
  ]);
  const yAxis = buildAutoAxis([
    ...data.map((point) => point.dP),
    ...fitPressures,
    currentPressure,
  ]);
  const scale = getChartScale(xAxis.min, xAxis.max, yAxis.min, yAxis.max, height);
  const rawPoints = data.map((point) => `${scale.x(point.Q)},${scale.y(point.dP)}`).join(" ");
  const fitPoints = fitFlows
    .map((q, index) => `${scale.x(q)},${scale.y(fitPressures[index])}`)
    .join(" ");
  const nonMonotonicSegments = data.slice(0, -1).flatMap((point, index) => {
    const next = data[index + 1];
    return point.is_non_monotonic || next.is_non_monotonic ? [[point, next] as const] : [];
  });

  const t = (english: string, chinese: string) =>
    translateFluidResistanceText(locale, english, chinese);

  return (
    <svg className={styles.chartSvg} viewBox={`0 0 ${CHART_WIDTH} ${height}`} role="img" aria-label={t("PQ characteristic curve generated from the current calculation parameters", "根据当前计算参数生成的 PQ 特性曲线")}>
      <title>{t("PQ characteristic curve generated by the original calculation core", "根据当前输入参数和原计算核心生成的 PQ 特性曲线")}</title>
      <text className={styles.chartTitle} x={CHART_WIDTH / 2} y={21}>{t("PQ Characteristic Curve", "PQ 特性曲线")} ({t("Operating flow", "工作流量")} {formatValue(currentFlow, 2)} ml/min)</text>
      {xAxis.ticks.map((value) => {
        const x = scale.x(value);
        return (
          <g key={`x-${value}`}>
            <line className={styles.chartGrid} x1={x} y1={CHART_MARGIN.top} x2={x} y2={CHART_MARGIN.top + scale.plotHeight} />
            <text className={styles.chartTick} x={x} y={CHART_MARGIN.top + scale.plotHeight + 22} textAnchor="middle">{formatScientificAxisTick(value, xAxis.exponent)}</text>
          </g>
        );
      })}
      {yAxis.ticks.map((value) => {
        const y = scale.y(value);
        return (
          <g key={`y-${value}`}>
            <line className={styles.chartGrid} x1={CHART_MARGIN.left} y1={y} x2={CHART_MARGIN.left + scale.plotWidth} y2={y} />
            <text className={styles.chartTick} x={CHART_MARGIN.left - 10} y={y + 4} textAnchor="end">{formatScientificAxisTick(value, yAxis.exponent)}</text>
          </g>
        );
      })}
      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top} x2={CHART_MARGIN.left} y2={CHART_MARGIN.top + scale.plotHeight} />
      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top + scale.plotHeight} x2={CHART_MARGIN.left + scale.plotWidth} y2={CHART_MARGIN.top + scale.plotHeight} />
      {yAxis.exponent ? (
        <text className={styles.chartTick} x={CHART_MARGIN.left - 56} y={CHART_MARGIN.top - 9}>{`1e${yAxis.exponent}`}</text>
      ) : null}
      <polyline className={styles.rawCurve} points={rawPoints} />
      <polyline className={styles.fitCurve} points={fitPoints} />
      {nonMonotonicSegments.map(([point, next], index) => (
        <line
          className={styles.nonMonotonicCurve}
          key={`non-monotonic-${index}`}
          x1={scale.x(point.Q)}
          y1={scale.y(point.dP)}
          x2={scale.x(next.Q)}
          y2={scale.y(next.dP)}
        />
      ))}
      {polynomial.samples.map((sample, index) => {
        const x = scale.x(sample.q);
        const y = scale.y(sample.pressure);
        return (
          <rect
            className={styles.samplePoint}
            key={`${sample.q}-${index}`}
            x={x - 3.5}
            y={y - 3.5}
            width="7"
            height="7"
            transform={`rotate(45 ${x} ${y})`}
          >
            <title>{t("Flow", "流量")} {formatValue(sample.q, 4)} ml/min; {t("pressure drop", "压降")} {formatValue(sample.pressure, 4)} Pa</title>
          </rect>
        );
      })}
      <circle className={styles.workPoint} cx={scale.x(currentFlow)} cy={scale.y(currentPressure)} r="6">
        <title>{t("Current operating point", "当前工作点")}: {formatValue(currentFlow, 4)} ml/min, {formatValue(currentPressure, 4)} Pa</title>
      </circle>
      <text className={styles.chartLabel} x={CHART_MARGIN.left + scale.plotWidth / 2} y={height - 10} textAnchor="middle">{t("Flow", "流量")} (ml/min){xAxis.exponent ? `  1e${xAxis.exponent}` : ""}</text>
      <text className={styles.chartLabel} transform={`translate(18 ${CHART_MARGIN.top + scale.plotHeight / 2}) rotate(-90)`} textAnchor="middle">{t("Total Pressure Drop", "总压降")} (Pa)</text>
      <line className={styles.rawCurve} x1={CHART_MARGIN.left} y1={height - 31} x2={CHART_MARGIN.left + 28} y2={height - 31} />
      <text className={styles.legendText} x={CHART_MARGIN.left + 35} y={height - 27}>{t("PQ Curve", "PQ 曲线")}</text>
      <line className={styles.fitCurve} x1={CHART_MARGIN.left + 120} y1={height - 31} x2={CHART_MARGIN.left + 148} y2={height - 31} />
      <text className={styles.legendText} x={CHART_MARGIN.left + 155} y={height - 27}>{t("Polynomial Fit", "多项式拟合")}</text>
      <rect className={styles.samplePoint} x={CHART_MARGIN.left + 258} y={height - 35} width="7" height="7" transform={`rotate(45 ${CHART_MARGIN.left + 261.5} ${height - 31.5})`} />
      <text className={styles.legendText} x={CHART_MARGIN.left + 273} y={height - 27}>{t("Samples", "采样点")}</text>
      <circle className={styles.workPoint} cx={CHART_MARGIN.left + 353} cy={height - 31} r="4" />
      <text className={styles.legendText} x={CHART_MARGIN.left + 364} y={height - 27}>{t("Operating Point", "工作点")}</text>
      {nonMonotonicSegments.length ? (
        <>
          <line className={styles.nonMonotonicCurve} x1={CHART_MARGIN.left + 435} y1={height - 31} x2={CHART_MARGIN.left + 463} y2={height - 31} />
          <text className={styles.legendText} x={CHART_MARGIN.left + 470} y={height - 27}>{t("Non-Monotonic Segment", "非单调段")}</text>
        </>
      ) : null}
    </svg>
  );
}

function ResidualChart({ polynomial, locale }: { polynomial: PolynomialData; locale?: string }) {
  const height = 260;
  const predictions = polynomial.samples.map((sample) => sample.predicted);
  const residuals = polynomial.samples.map((sample) => sample.residual);
  const xAxis = buildAutoAxis(predictions);
  const yAxis = buildAutoAxis([...residuals, 0]);
  const scale = getChartScale(xAxis.min, xAxis.max, yAxis.min, yAxis.max, height);

  const t = (english: string, chinese: string) =>
    translateFluidResistanceText(locale, english, chinese);

  return (
    <svg className={styles.residualSvg} viewBox={`0 0 ${CHART_WIDTH} ${height}`} role="img" aria-label={t("Residual chart generated from the current polynomial fit", "根据当前多项式拟合结果生成的残差图")}>
      <title>{t("Fit residuals for the current 18 calculation samples", "当前 18 个计算采样点的拟合残差")}</title>
      <text className={styles.chartTitle} x={CHART_WIDTH / 2} y={21}>{t("Residual Plot", "残差图")}</text>
      {xAxis.ticks.map((value) => {
        const x = scale.x(value);
        return (
          <g key={`x-${value}`}>
            <line className={styles.chartGrid} x1={x} y1={CHART_MARGIN.top} x2={x} y2={CHART_MARGIN.top + scale.plotHeight} />
            <text className={styles.chartTick} x={x} y={CHART_MARGIN.top + scale.plotHeight + 22} textAnchor="middle">{formatScientificAxisTick(value, xAxis.exponent)}</text>
          </g>
        );
      })}
      {yAxis.ticks.map((value) => {
        const y = scale.y(value);
        return (
          <g key={`y-${value}`}>
            <line className={styles.chartGrid} x1={CHART_MARGIN.left} y1={y} x2={CHART_MARGIN.left + scale.plotWidth} y2={y} />
            <text className={styles.chartTick} x={CHART_MARGIN.left - 10} y={y + 4} textAnchor="end">{formatScientificAxisTick(value, yAxis.exponent)}</text>
          </g>
        );
      })}
      {yAxis.exponent ? (
        <text className={styles.chartTick} x={CHART_MARGIN.left - 56} y={CHART_MARGIN.top - 9}>{`1e${yAxis.exponent}`}</text>
      ) : null}
      <line className={styles.zeroLine} x1={CHART_MARGIN.left} y1={scale.y(0)} x2={CHART_MARGIN.left + scale.plotWidth} y2={scale.y(0)} />
      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top} x2={CHART_MARGIN.left} y2={CHART_MARGIN.top + scale.plotHeight} />
      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top + scale.plotHeight} x2={CHART_MARGIN.left + scale.plotWidth} y2={CHART_MARGIN.top + scale.plotHeight} />
      {polynomial.samples.map((sample, index) => (
        <circle className={styles.residualPoint} key={`${sample.q}-${index}`} cx={scale.x(sample.predicted)} cy={scale.y(sample.residual)} r="4">
          <title>{t("Flow", "流量")} {formatValue(sample.q, 4)} ml/min; {t("calculated pressure drop", "计算压降")} {formatValue(sample.pressure, 4)} Pa; {t("predicted pressure drop", "预测压降")} {formatValue(sample.predicted, 4)} Pa; {t("residual", "残差")} {formatValue(sample.residual, 4)} Pa</title>
        </circle>
      ))}
      <text className={styles.chartLabel} x={CHART_MARGIN.left + scale.plotWidth / 2} y={height - 10} textAnchor="middle">{t("Predicted Pressure Drop", "预测压降")} (Pa){xAxis.exponent ? `  1e${xAxis.exponent}` : ""}</text>
      <text className={styles.chartLabel} transform={`translate(18 ${CHART_MARGIN.top + scale.plotHeight / 2}) rotate(-90)`} textAnchor="middle">{t("Residual", "残差")} (Pa)</text>
    </svg>
  );
}

export default function FluidResistanceCalculator({
  locale = "zh-CN",
}: FluidResistanceCalculatorProps) {
  const t = (english: string, chinese: string) =>
    translateFluidResistanceText(locale, english, chinese);
  const fluidOptions = useMemo(
    () => ["水", "空气", ...Object.keys(constants.PRESET_FLUIDS), CUSTOM_FLUID],
    [],
  );
  const orificeOptions = useMemo(() => Object.keys(constants.ORIFICE_PRESETS), []);
  const [fluidType, setFluidType] = useState("水");
  const [temperature, setTemperature] = useState("20.0");
  const [customRho, setCustomRho] = useState("1000.0");
  const [customViscosity, setCustomViscosity] = useState("0.001");
  const [viscosityMode, setViscosityMode] = useState<(typeof VISCOSITY_MODES)[number]>("动力黏度");
  const [cvModel, setCvModel] = useState<(typeof CV_MODELS)[number]>(CV_MODELS[0]);
  const [orificeShape, setOrificeShape] = useState(orificeOptions[0]);
  const [calculationMode, setCalculationMode] = useState<(typeof CALCULATION_MODES)[number]>(CALCULATION_MODES[0]);
  const [flowInput, setFlowInput] = useState("100.0");
  const [flowUnit, setFlowUnit] = useState<(typeof FLOW_UNITS)[number]>(FLOW_UNITS[0]);
  const [pressureInput, setPressureInput] = useState("100000");
  const [pressureUnit, setPressureUnit] = useState<(typeof PRESSURE_UNITS)[number]>(PRESSURE_UNITS[0]);
  const [rows, setRows] = useState<InputRow[]>(() =>
    DEFAULT_ROWS.map((row) => ({
      ...row,
      name:
        row.name === "管路"
          ? t("Tubing", "管路")
          : row.name === "阀或阻尼"
            ? t("Valve or Restrictor", "阀或阻尼")
            : row.name,
      notes:
        row.notes === "管路备注"
          ? t("Tubing Notes", "管路备注")
          : row.notes === "阻尼备注"
            ? t("Resistance Notes", "阻尼备注")
            : row.notes,
    })),
  );
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<CalculationState | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("results");

  const properties = useMemo(
    () =>
      buildFluidProperties(
        fluidType,
        toNumber(temperature, 20),
        toNumber(customRho, 1000),
        toNumber(customViscosity, 0.001),
        viscosityMode,
      ),
    [customRho, customViscosity, fluidType, temperature, viscosityMode],
  );

  const selectedOrifice = constants.ORIFICE_PRESETS[orificeShape];

  function updateRow(id: number, field: keyof InputRow, value: string) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  }

  function addRow() {
    const nextId = rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((current) => [
      ...current,
      {
        id: nextId,
        type: "ID",
        flow: flowInput,
        diameter_cv: "1.0",
        length: "100.0",
        xi: "0.0",
        name: t("Tubing", "管路"),
        notes: t("Tubing Notes", "管路备注"),
      },
    ]);
  }

  function deleteSelectedRow() {
    if (selectedRowId === null) {
      window.alert(t("Select a row to delete.", "请先选择要删除的行"));
      return;
    }
    setRows((current) => current.filter((row) => row.id !== selectedRowId));
    setSelectedRowId(null);
  }

  function runCalculation() {
    const normalizedRows = rows
      .map((row) => ({ ...row, type: normalizedType(row.type) }))
      .filter((row) => toNumber(row.flow) > 0);

    if (!normalizedRows.length) {
      window.alert(t("Enter valid fluid-path data.", "请输入有效的管路数据"));
      return;
    }

    const temp = toNumber(temperature, 20);
    let currentFlow = 0;
    let systemResult;

    if (calculationMode === "已知流量（求压降）") {
      currentFlow = calculator.convert_flow_to_mlmin(toNumber(flowInput), flowUnit);
      systemResult = calculator.compute_system_with_flow(
        normalizedRows,
        currentFlow,
        fluidType,
        temp,
        properties.rho,
        properties.mu,
        properties.nu,
        orificeShape,
        cvModel,
      );
    } else {
      const targetPressure = calculator.convert_pressure_to_pa(toNumber(pressureInput), pressureUnit);
      const solved = calculator.find_flow_by_pressure(
        targetPressure,
        normalizedRows,
        fluidType,
        temp,
        properties.rho,
        properties.mu,
        properties.nu,
        orificeShape,
        cvModel,
      );
      if (solved.flow <= 0) {
        window.alert(
          t(
            "The calculation did not converge. Check the input parameters.",
            "无法收敛，请检查输入参数",
          ),
        );
        return;
      }
      currentFlow = solved.flow;
      systemResult = calculator.compute_system_with_flow(
        normalizedRows,
        currentFlow,
        fluidType,
        temp,
        properties.rho,
        properties.mu,
        properties.nu,
        orificeShape,
        cvModel,
      );
    }

    const resultRows = systemResult.results.flatMap((raw, index) => {
      const pressure = raw["ΔPt(Pa)"];
      if (pressure === null || pressure === undefined || Number(pressure) === 0) return [];
      return [
        {
          source: normalizedRows[index],
          raw,
          flow: calculator.fmt_num(currentFlow, 2),
          regime: calculator.get_flow_regime(toNumber(raw["雷诺数Re"])),
        },
      ];
    });

    const statistics = calculateStatistics(
      normalizedRows,
      resultRows,
      currentFlow,
      properties,
      orificeShape,
      systemResult.total_dPy,
      systemResult.total_dPj,
      systemResult.total_dPt,
    );
    const polynomial = makePolynomial(
      normalizedRows,
      currentFlow,
      fluidType,
      temp,
      properties,
      orificeShape,
      cvModel,
    );
    const pqData = calculator.generate_pq_curve(
      normalizedRows,
      fluidType,
      temp,
      properties.rho,
      properties.mu,
      properties.nu,
      orificeShape,
      cvModel,
      currentFlow,
      200,
    );
    const summary =
      calculationMode === "已知流量（求压降）"
        ? `${t("Calculation complete. Total pressure drop =", "计算完成！总压降 =")} ${calculator.fmt_num(systemResult.total_dPt, 2)} Pa`
        : `${t("Reverse calculation complete. Flow =", "反算完成！流量 =")} ${calculator.fmt_num(currentFlow, 3)} ml/min, ${t("actual pressure drop =", "实际压降 =")} ${calculator.fmt_num(systemResult.total_dPt, 2)} Pa`;

    setCalculation({ summary, currentFlow, resultRows, statistics, pqData, polynomial });
    setActiveTab("results");
  }

  async function exportExcel() {
    if (!calculation) {
      window.alert(t("Run a calculation before exporting.", "请先完成计算"));
      return;
    }

    const XLSX = await import("xlsx");
    const reportColumns = RESULT_COLUMNS_EN.map((column, index) =>
      t(column, RESULT_COLUMNS[index]),
    );
    const reportRows = calculation.resultRows.map((row, index) =>
      Object.fromEntries(
        reportColumns.map((column, columnIndex) => [
          column,
          [
            index + 1,
            normalizedType(row.source.type),
            calculation.currentFlow,
            toNumber(row.source.diameter_cv),
            toNumber(row.source.length),
            toNumber(row.source.xi),
            row.raw["流速(m/s)"], row.raw["雷诺数Re"], row.raw["沿程阻力系数λ"], row.raw["层流底层(mm)"], row.raw["R(Pa/m)"], row.raw["ΔPy(Pa)"], row.raw["动压(Pa)"], row.raw["ΔPj(Pa)"], row.raw["ΔPt(Pa)"], row.raw["FR(Re)"], row.raw["当量孔径(mm)"], row.raw["当量Cv"],
            localizeFlowRegime(locale, row.regime, REGIME_EN[row.regime] ?? row.regime),
            row.source.name,
            row.source.notes,
          ][columnIndex],
        ]),
      ),
    );
    const metricKey = t("Metric", "指标");
    const valueKey = t("Value", "值");
    const summaryRows = [
      [t("Friction Loss (Pa)", "沿程损失 (Pa)"), calculation.statistics.totalDPy],
      [t("Local Loss (Pa)", "局部损失 (Pa)"), calculation.statistics.totalDPj],
      [t("Total Loss (Pa)", "总损失 (Pa)"), calculation.statistics.totalDPt],
      [t("Overall Cv", "整体 Cv"), calculation.statistics.overallCv],
      [t("Water Friction Loss (Pa)", "清水沿程 (Pa)"), calculation.statistics.waterDPy],
      [t("Water Local Loss (Pa)", "清水局部 (Pa)"), calculation.statistics.waterDPj],
      [t("Water Total Loss (Pa)", "清水总损失 (Pa)"), calculation.statistics.waterDPt],
      [t("Water Cv", "清水 Cv"), calculation.statistics.waterCv],
    ].map(([metric, value]) => ({ [metricKey]: metric, [valueKey]: value }));
    const pqRows = calculation.pqData.map((point) => ({
      [t("Flow Q (ml/min)", "流量 Q (ml/min)")]: point.Q,
      [t("Pressure Drop ΔP (Pa)", "压降 ΔP (Pa)")]: point.dP,
      [t("Minimum Reynolds Number", "最小雷诺数")]: point.Re_min,
      [t("Maximum Reynolds Number", "最大雷诺数")]: point.Re_max,
      [t("Pressure-Drop Difference", "压降差分")]: point.dP_diff,
      [t("Non-Monotonic Segment", "非单调区段")]: point.is_non_monotonic
        ? t("Yes", "是")
        : t("No", "否"),
      K: point.K,
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(reportRows), t("Results", "GPLCT 报表"));
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), t("Summary", "统计摘要"));
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(pqRows), t("PQ Curve Data", "PQ 曲线数据"));
    XLSX.writeFile(workbook, t("fluid-resistance-calculation.xlsx", "管内流动阻尼计算结果.xlsx"));
  }

  return (
    <section className={styles.page} data-locale={locale}>
      <div className={styles.workbench}>
        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("Fluid and Engineering Parameters", "流体与工程参数")}</h2>
            <div className={styles.sectionBody}>
              <label className={styles.field}>
                <span>{t("Fluid Type:", "流体类型:")}</span>
                <select value={fluidType} onChange={(event) => setFluidType(event.target.value)}>
                  {fluidOptions.map((option) => <option key={option} value={option}>{localizedName(option, locale)}</option>)}
                </select>
              </label>
              <label className={styles.field}>
                <span>{t("Temperature (C):", "温度 (C):")}</span>
                <input type="number" step="0.1" value={temperature} onChange={(event) => setTemperature(event.target.value)} />
              </label>

              {fluidType === CUSTOM_FLUID ? (
                <div className={styles.customFluid}>
                  <label className={styles.field}>
                    <span>{t("Density (kg/m³):", "密度 (kg/m³):")}</span>
                    <input value={customRho} onChange={(event) => setCustomRho(event.target.value)} inputMode="decimal" />
                  </label>
                  <div className={styles.field}>
                    <span>{t("Viscosity Input:", "黏度输入方式:")}</span>
                    <div className={styles.segment}>
                      {VISCOSITY_MODES.map((mode) => (
                        <button key={mode} type="button" className={viscosityMode === mode ? styles.selected : ""} onClick={() => setViscosityMode(mode)}>{mode === "动力黏度" ? t("Dynamic", "动力黏度") : t("Kinematic", "运动黏度")}</button>
                      ))}
                    </div>
                  </div>
                  <label className={styles.field}>
                    <span>{viscosityMode === "动力黏度" ? t("Dynamic Viscosity (Pa*s):", "动力黏度 (Pa*s):") : t("Kinematic Viscosity (m²/s):", "运动黏度 (m²/s):")}</span>
                    <input value={customViscosity} onChange={(event) => setCustomViscosity(event.target.value)} inputMode="decimal" />
                  </label>
                </div>
              ) : null}

              <div className={styles.propertyList}>
                <div><span>{t("Density:", "密度:")}</span><strong>{fluidType === "空气" ? properties.rho.toFixed(3) : properties.rho.toFixed(2)} kg/m3</strong></div>
                <div><span>{t("Dynamic Viscosity:", "动力黏度:")}</span><strong>{properties.mu.toExponential(3)} Pa*s</strong></div>
                <div><span>{t("Kinematic Viscosity:", "运动黏度:")}</span><strong>{properties.nu.toExponential(3)} m2/s</strong></div>
                {properties.description ? <p>{localizeFluidDescription(locale, fluidType, FLUID_DESCRIPTION_EN[fluidType] ?? properties.description, properties.description)}</p> : null}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("Calculation Parameters", "计算参数")}</h2>
            <div className={styles.sectionBody}>
              <div className={styles.field}>
                <span>{t("Cv Element Correction Model:", "Cv 元件修正模型:")}</span>
                <div className={styles.segment}>
                  {CV_MODELS.map((mode) => (
                    <button key={mode} type="button" className={cvModel === mode ? styles.selected : ""} onClick={() => setCvModel(mode)}>
                      {mode === CV_MODELS[1] ? (
                        <>
                          <span>{t("Pipe Friction", "管道沿程")}</span>
                          <span>{t("(Churchill Method)", "（Churchill 法）")}</span>
                        </>
                      ) : t("Orifice Restriction (Cd Method)", mode)}
                    </button>
                  ))}
                </div>
              </div>
              <label className={styles.field}>
                <span>{t("Default Cv Inlet Geometry:", "Cv 元件默认入口形状:")}</span>
                <select value={orificeShape} onChange={(event) => setOrificeShape(event.target.value)}>
                  {orificeOptions.map((option) => <option key={option} value={option}>{localizeOrificeName(locale, option, ORIFICE_NAME_EN[option] ?? option)}</option>)}
                </select>
                <small>Cd = {selectedOrifice.Cd_inf}, Re_c = {selectedOrifice.Re_c}</small>
              </label>
              <div className={styles.field}>
                <span>{t("Calculation Mode:", "计算模式:")}</span>
                <div className={styles.segment}>
                  {CALCULATION_MODES.map((mode) => (
                    <button key={mode} type="button" className={calculationMode === mode ? styles.selected : ""} onClick={() => setCalculationMode(mode)}>{mode === "已知流量（求压降）" ? t("Known Flow (Pressure Drop)", mode) : t("Known Pressure Drop (Flow)", mode)}</button>
                  ))}
                </div>
              </div>

              <div className={styles.subgroup}>
                <h3>{calculationMode === "已知流量（求压降）" ? t("Flow Input", "流量输入") : t("Pressure-Drop Input", "压降输入")}</h3>
                <div className={styles.inputPair}>
                  <label className={styles.field}>
                    <span>{calculationMode === "已知流量（求压降）" ? t("Flow:", "流量值:") : t("Pressure Drop:", "压降值:")}</span>
                    <input value={calculationMode === "已知流量（求压降）" ? flowInput : pressureInput} onChange={(event) => calculationMode === "已知流量（求压降）" ? setFlowInput(event.target.value) : setPressureInput(event.target.value)} inputMode="decimal" />
                  </label>
                  <label className={styles.field}>
                    <span>{t("Unit:", "单位:")}</span>
                    {calculationMode === "已知流量（求压降）" ? (
                      <select value={flowUnit} onChange={(event) => setFlowUnit(event.target.value as (typeof FLOW_UNITS)[number])}>{FLOW_UNITS.map((unit) => <option key={unit}>{unit}</option>)}</select>
                    ) : (
                      <select value={pressureUnit} onChange={(event) => setPressureUnit(event.target.value as (typeof PRESSURE_UNITS)[number])}>{PRESSURE_UNITS.map((unit) => <option key={unit}>{unit}</option>)}</select>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.buttonStack}>
              <button className={styles.primaryButton} type="button" onClick={runCalculation}>{t("Calculate", "开始计算")}</button>
              <button className={styles.secondaryButton} type="button" onClick={exportExcel}>{t("Export Excel", "导出 Excel")}</button>
            </div>
          </section>
        </aside>

        <div className={styles.workspace}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>{t("Fluid-Path Input Data", "管路输入数据")}</h2>
              <div className={styles.actions}>
                <button type="button" onClick={addRow}>+ {t("Add Row", "添加行")}</button>
                <button className={styles.deleteButton} type="button" onClick={deleteSelectedRow}>- {t("Delete Selected Row", "删除选中行")}</button>
              </div>
            </div>
            <div className={styles.inputTableWrap}>
              <table className={styles.inputTable}>
                <thead>
                  <tr>
                    <th>{t("No.", "序号")}</th><th>{t("Type", "类型")}</th><th>{t("Flow (ml/min)", "流量(ml/min)")}</th><th>{t("ID (mm)/Cv", "内径(mm)/Cv")}</th><th>{t("Length (mm)", "管长(mm)")}</th><th>{t("Local Resistance Coefficient ξ", "局部阻力系数ξ")}</th><th>{t("Name", "Name")}</th><th>{t("Notes", "Notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id} className={selectedRowId === row.id ? styles.selectedRow : ""} onClick={() => setSelectedRowId(row.id)}>
                      <td>{index + 1}</td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("type", "行类型")}`} value={row.type} onChange={(event) => updateRow(row.id, "type", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("flow", "行流量")}`} value={row.flow} onChange={(event) => updateRow(row.id, "flow", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("ID or Cv", "行内径或 Cv")}`} value={String(row.diameter_cv)} onChange={(event) => updateRow(row.id, "diameter_cv", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("length", "行管长")}`} value={String(row.length)} onChange={(event) => updateRow(row.id, "length", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("local resistance coefficient", "行局部阻力系数")}`} value={String(row.xi)} onChange={(event) => updateRow(row.id, "xi", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("name", "行 Name")}`} value={row.name ?? ""} onChange={(event) => updateRow(row.id, "name", event.target.value)} /></td>
                      <td><input aria-label={`${t("Row", "第")} ${index + 1} ${t("notes", "行 Notes")}`} value={row.notes ?? ""} onChange={(event) => updateRow(row.id, "notes", event.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={`${styles.panel} ${styles.resultPanel}`}>
            <div
              className={styles.tabs}
              role="tablist"
              aria-label={t("Calculation Results", "计算结果")}
              style={{
                "--active-offset": `${["results", "statistics", "pq", "polynomial"].indexOf(activeTab) * 100}%`,
              } as CSSProperties}
            >
              <span className={styles.tabIndicator} aria-hidden="true" />
              {([
                ["results", t("Results", "计算结果")],
                ["statistics", t("Summary", "统计摘要")],
                ["pq", t("PQ Curve", "PQ曲线")],
                ["polynomial", t("Polynomial Fit", "多项式拟合")],
              ] as const).map(([key, label]) => (
                <button key={key} type="button" role="tab" aria-selected={activeTab === key} className={activeTab === key ? styles.activeTab : ""} onClick={() => setActiveTab(key)}>{label}</button>
              ))}
            </div>

            {!calculation ? (
              <div className={styles.emptyState}>{t("Set the parameters and run the calculation.", "请设置参数并开始计算")}</div>
            ) : null}

            {calculation && activeTab === "results" ? (
              <div className={styles.resultTableWrap}>
                <table className={styles.resultTable}>
                  <thead><tr>{RESULT_COLUMNS_EN.map((column, index) => <th key={column}>{t(column, RESULT_COLUMNS[index])}</th>)}</tr></thead>
                  <tbody>
                    {calculation.resultRows.map((row, index) => (
                      <tr key={`${row.source.id}-${index}`}>
                        <td>{index + 1}</td><td>{normalizedType(row.source.type)}</td><td>{row.flow}</td><td>{row.source.diameter_cv}</td><td>{row.source.length}</td><td>{row.source.xi}</td>
                        <td>{formatValue(row.raw["流速(m/s)"], 2)}</td><td>{formatValue(row.raw["雷诺数Re"], 0)}</td><td>{formatValue(row.raw["沿程阻力系数λ"], 2)}</td><td>{formatValue(row.raw["层流底层(mm)"], 2)}</td><td>{formatValue(row.raw["R(Pa/m)"], 2)}</td>
                        <td>{formatValue(row.raw["ΔPy(Pa)"], 2)}</td><td>{formatValue(row.raw["动压(Pa)"], 2)}</td><td>{formatValue(row.raw["ΔPj(Pa)"], 2)}</td><td>{formatValue(row.raw["ΔPt(Pa)"], 2)}</td><td>{formatValue(row.raw["FR(Re)"], 4)}</td><td>{formatValue(row.raw["当量孔径(mm)"], 3)}</td><td>{formatValue(row.raw["当量Cv"], 5)}</td>
                        <td>{localizeFlowRegime(locale, row.regime, REGIME_EN[row.regime] ?? row.regime)}</td><td>{row.source.name}</td><td>{row.source.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {calculation && activeTab === "statistics" ? (
              <div className={styles.statisticsPanel}>
                <p className={styles.conditionLine}>{t("Current condition", "当前工况")}: {localizedName(fluidType, locale)} | {temperature}C | {t("Total flow", "总流量")} {formatValue(calculation.currentFlow, 3)} ml/min</p>
                <div className={styles.metricGrid}>
                  <div><span>{t("Friction Loss", "沿程损失")}</span><strong>{formatValue(calculation.statistics.totalDPy, 2)} Pa</strong><small>{t("Deviation", "偏差")}: {calculation.statistics.deltaDPy.toFixed(1)}%</small></div>
                  <div><span>{t("Local Loss", "局部损失")}</span><strong>{formatValue(calculation.statistics.totalDPj, 2)} Pa</strong><small>{t("Deviation", "偏差")}: {calculation.statistics.deltaDPj.toFixed(1)}%</small></div>
                  <div><span>{t("Total Loss", "总损失")}</span><strong>{formatValue(calculation.statistics.totalDPt, 2)} Pa</strong><small>{t("Deviation", "偏差")}: {calculation.statistics.deltaDPt.toFixed(1)}%</small></div>
                  <div><span>{t("Overall Cv", "整体Cv")}</span><strong>{formatValue(calculation.statistics.overallCv, 6)}</strong><small>{t("Deviation", "偏差")}: {calculation.statistics.deltaCv.toFixed(1)}%</small></div>
                </div>
                <h3>{t("Comparison with Water at 20C (Baseline)", "对比 20C 清水（基准）")}</h3>
                <div className={styles.metricGrid}>
                  <div><span>{t("Friction Loss (Water)", "沿程损失(清水)")}</span><strong>{formatValue(calculation.statistics.waterDPy, 2)} Pa</strong></div>
                  <div><span>{t("Local Loss (Water)", "局部损失(清水)")}</span><strong>{formatValue(calculation.statistics.waterDPj, 2)} Pa</strong></div>
                  <div><span>{t("Total Loss (Water)", "总损失(清水)")}</span><strong>{formatValue(calculation.statistics.waterDPt, 2)} Pa</strong></div>
                  <div><span>{t("Overall Cv (Water)", "整体Cv(清水)")}</span><strong>{formatValue(calculation.statistics.waterCv, 6)}</strong></div>
                </div>
                <div className={styles.analysisList}>
                  <p>{t("Local-loss share", "局部损失占比")} {calculation.statistics.localRatio.toFixed(1)}%{locale === "zh-CN" ? "，" : ". "}{calculation.statistics.localRatio > 50 ? t("Local losses exceed half of the total. Review valves, fittings and other local resistance elements.", "超过总损失一半，建议重点关注阀门、接头等局部阻力元件。") : t("Friction loss is dominant. Consider optimizing tubing length or internal diameter.", "以沿程损失为主，可考虑优化管路长度或内径。")}</p>
                  {calculation.statistics.maxDampSource ? <p>{t("Largest resistance source", "最大阻尼来源")}: {t("No.", "序号")} {calculation.statistics.maxDampSource.index} ({calculation.statistics.maxDampSource.type}), {t("name", "名称")}: {calculation.statistics.maxDampSource.name}, {t("total pressure drop", "总压降")} {formatValue(calculation.statistics.maxDampSource.dPt, 2)} Pa, {t("share of total loss", "占总损失比例")} {calculation.statistics.maxDampSource.ratio.toFixed(1)}%</p> : null}
                  {calculation.statistics.minCvSource ? <p>{t("Minimum equivalent Cv", "最小当量 Cv")}: {t("No.", "序号")} {calculation.statistics.minCvSource.index} ({calculation.statistics.minCvSource.type}), {t("name", "名称")}: {calculation.statistics.minCvSource.name}, Cv = {formatValue(calculation.statistics.minCvSource.cv, 5)}. {t("This element imposes the strongest flow limitation.", "该元件对流量的限制最显著。")}</p> : null}
                </div>
              </div>
            ) : null}

            {calculation && activeTab === "pq" ? (
              <div className={styles.chartPanel}>
                <PQChart
                  data={calculation.pqData}
                  polynomial={calculation.polynomial}
                  currentFlow={calculation.currentFlow}
                  currentPressure={calculation.statistics.totalDPt}
                  locale={locale}
                />
                <p className={calculation.pqData.some((point) => point.is_non_monotonic) ? styles.chartWarning : styles.chartNotice}>{calculation.pqData.some((point) => point.is_non_monotonic) ? t("A non-monotonic segment was detected within the sampling range.", "在采样范围内检测到非单调区段。") : t("No non-monotonic segment was detected within the sampling range; the flow characteristic is monotonic.", "在采样范围内未检测到非单调段，流动特性单调。")}</p>
              </div>
            ) : null}

            {calculation && activeTab === "polynomial" ? (
              <div className={styles.polynomialPanel}>
                <div className={styles.formula}>{calculation.polynomial.formula}</div>
                <table className={styles.metricsTable}>
                  <thead><tr><th></th><th>{t("Metric", "指标")}</th><th>{t("Value", "值")}</th></tr></thead>
                  <tbody>
                    <tr><td>1</td><td>{t("Polynomial Degree", "拟合阶数")}</td><td>{calculation.polynomial.fit.degree}{locale === "zh-CN" ? " 次" : ""}</td></tr>
                    <tr><td>2</td><td>{t("Coefficient of Determination R2", "决定系数 R2")}</td><td>{calculation.polynomial.fit.metrics.r2.toFixed(6)}</td></tr>
                    <tr><td>3</td><td>{t("Adjusted R2", "调整 R2")}</td><td>{calculation.polynomial.fit.metrics.r2_adj.toFixed(6)}</td></tr>
                    <tr><td>4</td><td>RMSE (Pa)</td><td>{formatValue(calculation.polynomial.fit.metrics.rmse, 2)}</td></tr>
                    <tr><td>5</td><td>MAE (Pa)</td><td>{formatValue(calculation.polynomial.fit.metrics.mae, 2)}</td></tr>
                    <tr><td>6</td><td>{t("Fit Quality", "拟合质量")}</td><td>{metricQuality(calculation.polynomial.fit, locale)}</td></tr>
                    <tr><td>7</td><td>{t("Sampling Range", "采样范围")}</td><td>{formatValue(calculation.polynomial.qMin, 2)} ~ {formatValue(calculation.polynomial.qMax, 2)} ml/min</td></tr>
                  </tbody>
                </table>
                <div className={styles.residualChart}><ResidualChart polynomial={calculation.polynomial} locale={locale} /></div>
              </div>
            ) : null}

            <div className={styles.statusBar}>{calculation?.summary ?? t("Ready", "等待计算")}</div>
          </section>
        </div>
      </div>
    </section>
  );
}
