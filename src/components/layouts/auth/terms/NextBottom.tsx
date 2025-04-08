import { BottomSheet, Button } from '@/components/ui/common';

function NextBottom() {
  return (
    <BottomSheet
      className='flex items-center justify-center py-[13px] px-[28px]'
      children={
        <Button disabled={true} className='text-white w-full mb-5'>
          다음
        </Button>
      }
    />
  );
}

export default NextBottom;
