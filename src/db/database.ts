import Dexie, { Table } from 'dexie';

export interface CustomInterest {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface Community {
  id?: number;
  name: string;
  description: string;
  interests: string[];
  createdAt: Date;
  memberCount: number;
  conversationCount: number;
  maxConversations: number;
}

export interface Topic {
  id?: number;
  communityId: number;
  title: string;
  description: string;
  participants: number;
  createdAt: Date;
}

export class AppDatabase extends Dexie {
  customInterests!: Table<CustomInterest>;
  communities!: Table<Community>;
  topics!: Table<Topic>;

  constructor() {
    super('communityApp');
    
    this.version(2).stores({
      customInterests: '++id, name, createdAt',
      communities: '++id, name, createdAt',
      topics: '++id, communityId, title, createdAt'
    });
  }
}

export const db = new AppDatabase();

// Helper functions pentru operațiuni cu baza de date
export const addCustomInterest = async (name: string): Promise<void> => {
  console.log('Attempting to add custom interest:', name);
  try {
    await db.customInterests.add({
      name,
      createdAt: new Date()
    });
    console.log('Successfully added custom interest:', name);
  } catch (error) {
    console.error('Error adding custom interest:', error);
    throw error;
  }
};

export const getAllCustomInterests = async (): Promise<CustomInterest[]> => {
  console.log('Fetching all custom interests');
  try {
    const interests = await db.customInterests.toArray();
    console.log('Retrieved custom interests:', interests);
    return interests;
  } catch (error) {
    console.error('Error fetching custom interests:', error);
    throw error;
  }
};

// Helper functions pentru comunități
export const addCommunity = async (community: Omit<Community, 'id' | 'createdAt'>): Promise<void> => {
  console.log('Attempting to add community:', community);
  try {
    await db.communities.add({
      ...community,
      createdAt: new Date()
    });
    console.log('Successfully added community:', community.name);
  } catch (error) {
    console.error('Error adding community:', error);
    throw error;
  }
};

export const getAllCommunities = async (): Promise<Community[]> => {
  console.log('Fetching all communities');
  try {
    const communities = await db.communities.toArray();
    console.log('Retrieved communities:', communities);
    return communities;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};

// Helper functions pentru topics
export const addTopic = async (topic: Omit<Topic, 'id' | 'createdAt'>): Promise<number> => {
  console.log('Attempting to add topic:', topic);
  try {
    const id = await db.topics.add({
      ...topic,
      createdAt: new Date()
    });
    
    // Update conversation count for the community
    const community = await db.communities.get(topic.communityId);
    if (community) {
      await db.communities.update(topic.communityId, {
        conversationCount: (community.conversationCount || 0) + 1
      });
    }
    
    console.log('Successfully added topic:', topic.title);
    return id;
  } catch (error) {
    console.error('Error adding topic:', error);
    throw error;
  }
};

export const getTopicsByCommunity = async (communityId: number): Promise<Topic[]> => {
  console.log('Fetching topics for community:', communityId);
  try {
    const topics = await db.topics
      .where('communityId')
      .equals(communityId)
      .toArray();
    console.log('Retrieved topics:', topics);
    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const updateTopicParticipants = async (topicId: number, increment: boolean = true): Promise<void> => {
  console.log(`${increment ? 'Incrementing' : 'Decrementing'} participants for topic:`, topicId);
  try {
    const topic = await db.topics.get(topicId);
    if (topic) {
      await db.topics.update(topicId, {
        participants: (topic.participants || 0) + (increment ? 1 : -1)
      });
    }
  } catch (error) {
    console.error('Error updating topic participants:', error);
    throw error;
  }
};