function priceFormatter(price: number): string {
  const formattedPrice = price.toLocaleString('ko-KR');
  return `${formattedPrice}`;
}

export default priceFormatter;
