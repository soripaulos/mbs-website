import { Link, useLocation } from 'react-router-dom';
import { House, Compass, Users, Images, Phone, MapPin } from 'lucide-react';

const tabs = [
  { path: '/', label: 'Home', icon: House },
  { path: '/about', label: 'About', icon: Compass },
  { path: '/staff', label: 'Staff', icon: Users },
  { path: '/dembi-dollo', label: 'Dembi Dollo', icon: MapPin },
  { path: '/gallery', label: 'Gallery', icon: Images },
  { path: '/contact', label: 'Contact', icon: Phone },
];

/**
 * App-style bottom navigation for mobile. All six destinations sit in a
 * single row — no "More" overflow sheet. Hidden from `md` up, where the
 * header's own nav links take over.
 */
export default function MobileTabBar() {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[56] border-t border-white/10 bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Primary"
    >
      <div className="grid grid-cols-6">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-1 py-2.5"
              aria-current={active ? 'page' : undefined}
            >
              <tab.icon
                size={19}
                strokeWidth={active ? 2.4 : 1.8}
                className={`transition-colors ${active ? 'text-sun' : 'text-bone/55'}`}
              />
              <span
                className={`px-0.5 text-center font-label text-[8.5px] font-medium uppercase leading-tight tracking-[0.04em] transition-colors ${
                  active ? 'text-sun' : 'text-bone/45'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
