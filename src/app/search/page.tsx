import SearchForm from '@/components/pages/search/SearchForm';
import RecentSearchList from '@/components/modules/search/RecentSearchList';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const params = await searchParams;
  // TODO: api 패칭 연결 필요
  // const { data: recentSearchHistoryDatas } = await getRecentSearchHistory();

  return (
    <main className='flex flex-col h-full max-h-dvh'>
      <SearchForm params={params} />

      <RecentSearchList callbackUrl={params.callbackUrl} />
    </main>
  );
}
