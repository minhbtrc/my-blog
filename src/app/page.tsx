import TerminalZenHome from './terminal-zen-home';

// Force static rendering and set revalidation
export const dynamic = 'force-static';
export const revalidate = 0;

export default function Page() {
  // Home version options:
  // - Original: HomeClient
  // - Simplified: SimplifiedHome
  // - Terminal Zen: TerminalZenHome
  return <TerminalZenHome />;
}
