import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import MobileTabBar from '@/components/MobileTabBar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Staff from '@/pages/Staff';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import DembiDollo from '@/pages/DembiDollo';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';
import { siteSettings as mockSiteSettings } from '@/data/mockData';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

// Dynamically sets document title and favicon
function DocumentHead() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);

  useEffect(() => {
    if (siteSettings.title) {
      document.title = siteSettings.title;
    }
    if (siteSettings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteSettings.favicon;
    }
  }, [siteSettings]);

  return null;
}

function Shell() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <ScrollProgress />
      <Navbar />
      {/* keyed by route so every page enters with a soft rise */}
      <main key={pathname} className="flex-grow animate-page-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dembi-dollo" element={<DembiDollo />} />
        </Routes>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <DocumentHead />
      <ScrollToTop />
      <Shell />
      <Toaster />
    </HashRouter>
  );
}

export default App;
