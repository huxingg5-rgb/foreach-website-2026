export type SourceRow = {
  type: string;
  flow?: string | number;
  diameter_cv: string | number;
  length: string | number;
  xi: string | number;
  name?: string;
  notes?: string;
};

export type CalculationResultRow = Record<string, number | string | null>;

export type SystemResult = {
  total_dPt: number;
  total_dPy: number;
  total_dPj: number;
  results: CalculationResultRow[];
  Re_list: number[];
};

export type PQPoint = {
  Q: number;
  dP: number;
  Re_min: number;
  Re_max: number;
  dP_diff: number;
  is_non_monotonic: boolean;
  K: number | null;
};

export type PolynomialFit = {
  coeffs: number[];
  degree: number;
  metrics: {
    r2: number;
    r2_adj: number;
    rmse: number;
    mae: number;
  };
};

declare const calculator: {
  water_density(temperature: number): number;
  water_dynamic_viscosity(temperature: number): number;
  water_kinematic_viscosity(temperature: number): number;
  air_density(temperature: number): number;
  air_dynamic_viscosity(temperature: number): number;
  air_kinematic_viscosity(temperature: number): number;
  pressure_loss_along_length(
    flowM3s: number,
    diameterM: number,
    lengthM: number,
    nu: number,
    rho: number,
  ): Record<string, number>;
  cv_pressure_drop_corrected(
    flowMlMin: number,
    cv: number,
    rho: number,
    mu: number,
    diameterMm: number,
    reCritical: number,
  ): number;
  compute_system_with_flow(
    rows: SourceRow[],
    flowMlMin: number,
    fluidType: string,
    temperature: number,
    userRho: number,
    userMu: number,
    userNu: number,
    orificeShape: string,
    cvModel: string,
  ): SystemResult;
  compute_system_with_row_flows(
    rows: SourceRow[],
    fallbackFlowMlMin: number,
    fluidType: string,
    temperature: number,
    userRho: number,
    userMu: number,
    userNu: number,
    orificeShape: string,
    cvModel: string,
  ): SystemResult;
  find_flow_by_pressure(
    targetPa: number,
    rows: SourceRow[],
    fluidType: string,
    temperature: number,
    userRho: number,
    userMu: number,
    userNu: number,
    orificeShape: string,
    cvModel: string,
  ): { flow: number; pressure: number; error: number };
  generate_pq_curve(
    rows: SourceRow[],
    fluidType: string,
    temperature: number,
    userRho: number,
    userMu: number,
    userNu: number,
    orificeShape: string,
    cvModel: string,
    centerFlow: number,
    points?: number,
  ): PQPoint[];
  generate_pq_curve_with_row_flows(
    rows: SourceRow[],
    fluidType: string,
    temperature: number,
    userRho: number,
    userMu: number,
    userNu: number,
    orificeShape: string,
    cvModel: string,
    centerFlow: number,
    points?: number,
  ): PQPoint[];
  fit_polynomial(flows: number[], pressureDrops: number[], workFlow: number): PolynomialFit;
  polyval(coefficients: number[], x: number): number;
  convert_flow_to_mlmin(value: number, unit: string): number;
  convert_pressure_to_pa(value: number, unit: string): number;
  convert_mlmin_to_unit(value: number, unit: string): number;
  convert_pa_to_unit(value: number, unit: string): number;
  fmt_num(value: number | null | undefined, precision?: number): string;
  get_flow_regime(reynolds: number | null | undefined): string;
};

export default calculator;
