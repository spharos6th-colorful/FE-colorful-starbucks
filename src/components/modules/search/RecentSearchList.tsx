// import { getRecentSearchHistory } from '@/actions/search-service';
import { SubTitle, Body } from '@/components/ui/common';
import RecentSearchItem from '@/components/ui/search/RecentSearchItem';
import SearchSection from '@/components/ui/search/SearchSection';

export default async function RecentSearchList({ callbackUrl }: { callbackUrl?: string }) {
  // FIXME: api 패칭 연결 필요
  // const recentSearchHistoryDatas = await getRecentSearchHistory();

  const recentSearchHistoryDatas = [
    { id: 1, query: '아무말이나 엄청 길게 써봅시다. 글 줄임말 처리는 어떻게 할까요' },
    { id: 2, query: '스탠' },
    { id: 3, query: '케이크' },
    { id: 4, query: '대용량' },
    { id: 5, query: '머그컵' },
  ];

  if (!recentSearchHistoryDatas) {
    return (
      <SearchSection className='flex flex-col justify-center h-full'>
        <Body className='text-black text-center'>최근 검색어가 없습니다.</Body>
      </SearchSection>
    );
  }

  return (
    <SearchSection>
      <div className='flex justify-between items-center pb-5'>
        <SubTitle>최근 검색어</SubTitle>
        <button className='text-caption2 text-text-700 hover:text-black focus:text-black transition-colors cursor-pointer'>
          전체 삭제
        </button>
      </div>

      <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 border-b border-[#e0e0e0] pb-5'>
        {recentSearchHistoryDatas.map((recentSearchHistory) => (
          <RecentSearchItem
            callbackUrl={callbackUrl}
            recentSearchHistory={recentSearchHistory}
            key={recentSearchHistory.id}
          />
        ))}
      </ul>
    </SearchSection>
  );
}
