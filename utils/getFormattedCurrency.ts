const currencyFormatter = new Intl.NumberFormat('en-IN');

export const getFormattedCurrency = (price) =>
    currencyFormatter.format(price);
