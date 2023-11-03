export const commaSeparatedPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getDocument = (docArray, docId) => {
  const doc = docArray.find((category) => category._id === docId);
  return doc;
};
