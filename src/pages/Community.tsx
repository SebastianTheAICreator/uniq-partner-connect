
import ConversationList from "@/components/ConversationList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNotifications } from "@/contexts/NotificationContext";

const CommunityPage = () => {
  const { addNotification } = useNotifications();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10] flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <ConversationList />
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
