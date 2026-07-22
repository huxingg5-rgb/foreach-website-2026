export type PresetFluid = {
  rho: number;
  mu: number;
  desc: string;
};

export type OrificePreset = {
  Cd_inf: number;
  Re_c: number;
};

declare const constants: {
  pi: number;
  g: number;
  GPM2MLMIN: number;
  LPM2MLMIN: number;
  M3HR2MLMIN: number;
  M3S2MLMIN: number;
  ULMIN2MLMIN: number;
  MLS2MLMIN: number;
  ULS2MLMIN: number;
  PSI2PA: number;
  KPA2PA: number;
  MPA2PA: number;
  BAR2PA: number;
  MBAR2PA: number;
  ATM2PA: number;
  MMHG2PA: number;
  MMH2O2PA: number;
  CV_TO_DIAMETER_COEFF: number;
  Re_th_1: number;
  Re_th_2: number;
  DEFAULT_Re_c: number;
  PRESET_FLUIDS: Record<string, PresetFluid>;
  ORIFICE_PRESETS: Record<string, OrificePreset>;
};

export default constants;
