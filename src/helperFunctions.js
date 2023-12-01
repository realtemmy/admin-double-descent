export const commaSeparatedPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getDocument = (docArray, docId) => {
  const doc = docArray.find((category) => category._id === docId);
  return doc;
};

export const getSectionsFromCategory = async (categoryId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/category/${categoryId}/section`
    );
    const { data, status } = await res.json();
    if (status === "success") {
      return data;
    }else{
      return data;
    }
  } catch (error) {
    return error;
  }
};
