import Dexie, { Table } from 'dexie';

export interface CustomInterest {
  id?: number;
  name: string;
  createdAt: Date;
}

export class AppDatabase extends Dexie {
  customInterests!: Table<CustomInterest>;

  constructor() {
    super('communityApp');
    
    this.version(1).stores({
      customInterests: '++id, name, createdAt'
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