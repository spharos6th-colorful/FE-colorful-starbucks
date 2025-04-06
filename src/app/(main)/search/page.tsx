import Link from 'next/link';

import SearchIcon from '@/assets/icons/common/search.svg';
import CloseIcon from '@/assets/icons/common/close.svg';

export default function SearchPage() {
  const searchTagDatas = [
    { id: 1, name: '초콜릿' },
    { id: 2, name: '케이크' },
    { id: 3, name: '스탠리' },
    { id: 4, name: '더스트백' },
    { id: 5, name: '각인' },
  ];

  const recentSearchHistoryDatas = [
    { id: 1, query: '#아무말이나 엄청 길게 써봅시다. 글 줄임말 처리는 어떻게 할까요?' },
    { id: 2, query: '#케이크' },
    { id: 3, query: '#케이크' },
    { id: 4, query: '#케이크' },
    { id: 5, query: '#케이크' },
  ];

  return (
    <main className='flex flex-col h-full max-h-dvh'>
      <form className='flex justify-between gap-2 px-6 pt-3 pb-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.1)]'>
        <div
          className={`grid grid-cols-[1fr_auto_auto] items-center w-full bg-[#F7F7F7] placeholder-text-[#d9d9d9] text-[13px] font-semibold px-2 py-2 rounded-md`}
        >
          <input type='text' name='query' placeholder='검색어를 입력해주세요' className='outline-none' />
          <button type='submit' className='w-fit'>
            <SearchIcon />
          </button>
        </div>

        <button type='reset' className='w-fit'>
          <CloseIcon width={24} height={24} />
        </button>
      </form>

      <div className='grid grid-rows-2 h-full'>
        {/* 최근 검색어 없을 경우 분기 처리 UI */}
        {/* <section className='flex flex-col justify-center h-full'>
          <p className='text-black text-center font-medium text-sm'>최근 검색어가 없습니다.</p>
        </section> */}
        <section className='p-6 flex-shrink-0'>
          <p className='text-[#6B6B6B] text-xs pb-5'>최근 검색어</p>
          <ul className='grid grid-cols-2 gap-x-12 gap-y-3.5 border-b border-[#e0e0e0] pb-5'>
            {recentSearchHistoryDatas.map((recentSearchHistory) => (
              <li key={recentSearchHistory.id} className='flex justify-between items-center gap-1'>
                <Link href={`/search?query=${recentSearchHistory.query}`} className='text-sm truncate'>
                  {recentSearchHistory.query}
                </Link>

                <button>
                  <CloseIcon width={16} height={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className='flex justify-end mt-5'>
            <button className='text-xs text-[#212121] font-semibold'>전체 삭제</button>
          </div>
        </section>

        <section className='px-6 space-y-[1.375rem] flex-shrink-0'>
          <p className='font-semibold text-lg'>추천 태그</p>
          <ul className='flex flex-wrap gap-x-2.5 gap-y-2'>
            {searchTagDatas.map((tag) => (
              <li
                key={tag.id}
                className='rounded-full bg-[#00A862] text-white text-[0.9375rem] leading-5 w-fit px-3 py-1.5'
              >
                <Link href={`/search?query=${tag.name}`} className='cursor-pointer'>
                  #{tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
