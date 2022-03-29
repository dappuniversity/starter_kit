const round = (num: number, decimals: number = 2) => Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;

export {
  round,
};
