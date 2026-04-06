import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Player } from './Player';
import { usePlayerStore } from '@/store/playerStore';

export function Layout() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  // Mobile: bottom-nav (56px) + player (80px) if playing, or just bottom-nav
  // Desktop: player (80px) if playing, or nothing
  const bottomPadding = currentTrack
    ? 'pb-[8.5rem] sm:pb-24'
    : 'pb-[4.5rem] sm:pb-4';

  return (
    <div className="min-h-screen flex flex-col bg-surface-950">
      <Navbar />
      <main className={`flex-1 ${bottomPadding}`} role="main">
        <Outlet />
      </main>
      <Player />
      <MobileNav />
    </div>
  );
}
