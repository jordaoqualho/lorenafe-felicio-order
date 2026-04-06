export const SHOW_PASCOA_SWEETS =
  (typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined) ||
  new Date().getFullYear() >= 2027;
