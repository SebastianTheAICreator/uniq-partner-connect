import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';
import TopicCard from './conversation/TopicCard';
import TopicPosts from './conversation/TopicPosts';
import CreateDiscussion from './conversation/CreateDiscussion';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  participants: number;
  timestamp: string;
  likes: number;
  dislikes: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Discuție despre artă contemporană',
    lastMessage: 'Ce părere aveți despre ultima expoziție de la MoMA?',
    participants: 45,
    timestamp: '2 min ago',
    likes: 123,
    dislikes: 12
  },
  {
    id: '2',
    title: 'Gaming & eSports',
    lastMessage: 'Cine se alătură pentru un turneu amical?',
    participants: 78,
    timestamp: '5 min ago',
    likes: 89,
    dislikes: 5
  },
];

const ConversationList = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    console.log('Selected topic:', topicId);
  };

  const handleNewDiscussion = (discussion: { title: string; description: string }) => {
    console.log('New discussion created:', discussion);
  };

  const selectedTopicData = mockConversations.find(conv => conv.id === selectedTopic);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar conversations={mockConversations} />

      <div className="flex-1 ml-[240px] p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-4xl mx-auto space-y-8 mt-8">
          {selectedTopic ? (
            <TopicPosts
              topicId={selectedTopic}
              topic={{
                title: selectedTopicData?.title || '',
                description: selectedTopicData?.lastMessage || ''
              }}
              onBack={() => setSelectedTopic(null)}
            />
          ) : (
            <div className="space-y-6">
              <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
              {mockConversations.map((conv) => (
                <TopicCard
                  key={conv.id}
                  topic={conv}
                  onTopicClick={handleTopicClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
