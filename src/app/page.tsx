import HomeClient from '@/app/HomeClient';

// Force static rendering and set revalidation
export const dynamic = 'force-static';
export const revalidate = 0;

export default function Page() {
  return <HomeClient />;
}
