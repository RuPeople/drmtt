export const formatPrice = (price: number | string): string => {
    const priceNumber = typeof price === 'string' ? parseFloat(price) : price;

    if (Number.isNaN(priceNumber)) {
        return '';
    }

    return `${priceNumber.toLocaleString('ru-RU').replace(/,/g, ' ')} ₽`;
};
