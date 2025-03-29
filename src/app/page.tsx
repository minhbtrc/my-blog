import dynamicImport from 'next/dynamic';
const HomePageComponent = dynamicImport(() => import('./(home)/page'), { ssr: false });

export default HomePageComponent;

// Disable static generation to fix missing server file on Vercel
export const dynamic = 'force-dynamic';
