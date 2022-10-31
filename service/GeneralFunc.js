export function numberFormat(value) {
    return value.toLocaleString({ minimumFractionDigits: 0 }).replace(/\,/g, ".");
  }
  