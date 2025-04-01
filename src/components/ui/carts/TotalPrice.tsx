interface TotalPriceProps {
  price: number;
}

function TotalPrice({ price }: TotalPriceProps) {
  const formatCurrency = (price: number) => {
    return price.toLocaleString('ko-KR');
  };
  return (
    <p className='text-title2'>
      {formatCurrency(price)}
      <span className=' text-body2'>원</span>
    </p>
  );
}

export default TotalPrice;
