import React from 'react';

import LogInSection from '@/components/pages/auth/LogInSection';
import WelcomeMessage from '@/components/pages/auth/WelcomeMessage';
import AuthLink from '@/components/modules/auth/AuthLink';

export default function Page() {
  return (
    <main className='px-[1.75rem] mx-auto min-h-screen'>
      <WelcomeMessage />
      <LogInSection />
      <AuthLink />
    </main>
  );
}
