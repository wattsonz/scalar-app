const currencyFormatter = new Intl.NumberFormat('ja-JP');

export const getFormattedCurrency = (price) =>
    currencyFormatter.format(price);
