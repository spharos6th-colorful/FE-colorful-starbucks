interface TotalItemProps {
  count: number;
}
function TotalItem({ count }: TotalItemProps) {
  return (
    <p className='text-body2'>
      총 <span className='text-primary-100 ml-[5px]'> {count}</span>
      <span>건</span>
    </p>
  );
}

export default TotalItem;
