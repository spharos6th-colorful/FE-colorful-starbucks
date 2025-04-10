import LogInSection from '@/components/pages/auth/LogInSection';
import WelcomeMessage from '@/components/pages/auth/WelcomeMessage';
import React from 'react';

export default function Page() {
  return (
    <main className='px-[1.75rem] mx-auto min-h-screen'>
      <WelcomeMessage />
      <LogInSection />
    </main>
  );
}
