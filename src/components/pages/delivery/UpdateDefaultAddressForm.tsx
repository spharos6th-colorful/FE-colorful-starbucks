import UpdateDefaultAddressField from '@/components/modules/delivery/UpdateDefaultAddressField';
import { BottomSheet, Button } from '@/components/ui/common';

export default function UpdateDefaultAddressForm({
  handleUpdateDefaultAddress,
}: {
  handleUpdateDefaultAddress: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={handleUpdateDefaultAddress}>
      <UpdateDefaultAddressField />

      <BottomSheet>
        <Button variant={'default'} width={'full'} type='submit'>
          변경하기
        </Button>
      </BottomSheet>
    </form>
  );
}
