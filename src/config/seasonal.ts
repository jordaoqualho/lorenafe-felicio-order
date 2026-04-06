export const SHOW_PASCOA_AND_CATEGORY_UI =
  (typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined) ||
  new Date().getFullYear() >= 2027;
