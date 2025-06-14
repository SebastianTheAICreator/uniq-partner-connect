
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Feed from '@/pages/Feed';
import Communities from '@/pages/Communities';
import Community from '@/pages/Community';
import DiscoverPeople from '@/pages/DiscoverPeople';
import TrendingTopics from '@/pages/TrendingTopics';
import { Toaster } from '@/components/ui/toaster';
import { NotificationProvider } from '@/contexts/NotificationContext';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/discover-people" element={<DiscoverPeople />} />
            <Route path="/trending-topics" element={<TrendingTopics />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
