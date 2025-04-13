'use client';
import { useRouter } from 'next/navigation';

import SearchIcon from '@/assets/icons/common/search.svg';
import CloseIcon from '@/assets/icons/common/close.svg';
// import { addRecentSearchHistory } from '@/actions/search-service';

type SearchFormProps = {
  params: { callbackUrl?: string };
};

export default function SearchForm({ params }: SearchFormProps) {
  const router = useRouter();

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('query') as string;

    const searchParams = new URLSearchParams();

    if (searchQuery) searchParams.set('query', searchQuery);
    if (params.callbackUrl) searchParams.set('callbackUrl', params.callbackUrl);

    try {
      // await addRecentSearchHistory(searchQuery);
      router.push(`/search/result?${searchParams.toString()}`, {
        scroll: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleClickBack = () => {
    if (!params.callbackUrl) return router.back();
    router.push(params.callbackUrl, { scroll: false });
  };

  return (
    <form
      onSubmit={(e) => handleSubmitSearch(e)}
      className='flex justify-between gap-2 px-6 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.1)]'
    >
      <div
        className={`grid grid-cols-[1fr_auto_auto] items-center w-full bg-[#F7F7F7] placeholder-text-[#d9d9d9] text-[13px] font-semibold px-2 rounded-sm`}
      >
        <input
          type='text'
          name='query'
          placeholder='검색어를 입력해주세요'
          className='outline-none px-2'
        />
        <button type='submit' className='w-fit'>
          <SearchIcon />
        </button>
      </div>

      <button
        onClick={handleClickBack}
        type='reset'
        className='w-fit cursor-pointer'
      >
        <CloseIcon width={24} height={24} fill={'var(--color-text-900)'} />
      </button>
    </form>
  );
}
