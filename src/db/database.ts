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

export class AppDatabase extends Dexie {
  customInterests!: Table<CustomInterest>;
  communities!: Table<Community>;

  constructor() {
    super('communityApp');
    
    this.version(1).stores({
      customInterests: '++id, name, createdAt',
      communities: '++id, name, createdAt'
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
    // Update maxConversations to 500 for all existing communities
    const updatedCommunities = await Promise.all(
      communities.map(async (community) => {
        if (community.maxConversations !== 500) {
          await db.communities.update(community.id!, {
            maxConversations: 500
          });
          return { ...community, maxConversations: 500 };
        }
        return community;
      })
    );
    console.log('Retrieved communities:', updatedCommunities);
    return updatedCommunities;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};

export const updateCommunityMemberCount = async (communityId: number): Promise<void> => {
  console.log('Updating member count for community:', communityId);
  try {
    const community = await db.communities.get(communityId);
    if (community) {
      await db.communities.update(communityId, {
        memberCount: 1
      });
      console.log('Successfully updated member count for community:', communityId);
    }
  } catch (error) {
    console.error('Error updating community member count:', error);
    throw error;
  }
};