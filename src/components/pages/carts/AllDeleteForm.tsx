import AllSelectBox from '@/components/modules/carts/AllSelectBox';
import DeleteActionList from '@/components/modules/carts/DeleteActionList';

function AllDeleteForm() {
  const idListDummy = [1, 2, 3, 4, 5];
  //   const checked = true;

  return (
    <section className='flex justify-between px-[24px] py-[12px] border-b border-DCDCDC'>
      <AllSelectBox
      //    checked={checked}
      />
      <DeleteActionList id={idListDummy} />
    </section>
  );
}

export default AllDeleteForm;
