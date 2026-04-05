import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Player } from './Player';
import { usePlayerStore } from '@/store/playerStore';

export function Layout() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-surface-950">
      <Navbar />
      <main
        className={`flex-1 ${currentTrack ? 'pb-24' : 'pb-4'}`}
        role="main"
      >
        <Outlet />
      </main>
      <Player />
    </div>
  );
}
