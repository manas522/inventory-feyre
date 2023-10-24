export const getIDFromProduct = (product) => {
    return product.match(/(\d)+$/)[0];
};