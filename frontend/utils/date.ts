const bigNumberToDate = (date: number) => new Date(Number(date * 1000));

const formatDate = (date: Date) => date.toLocaleDateString('es-ES', { hour: 'numeric', minute: 'numeric' });

export {
  bigNumberToDate,
  formatDate,
};
