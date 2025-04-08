import TermsCheckBox from './TermsCheckBox';

async function TermsList() {
  //   const termsId = await getTermsListAction();
  const termsId = [{ termsId: 1 }, { termsId: 2 }, { termsId: 3 }, { termsId: 4 }];
  return (
    <ul className='grid grid-rows-4 gap-y-[30px] my-[20px]'>
      {termsId.map((item) => (
        <TermsCheckBox termsId={item.termsId} />
      ))}
    </ul>
  );
}

export default TermsList;
