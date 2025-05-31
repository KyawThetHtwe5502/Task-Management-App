import { create } from 'zustand';


export const useTaskStore = create((set) => ({
  tasks: [],
      setTasks: (tasks) => set({tasks:tasks}),

  selectedDate: new Date(),
  filterValue: '',
  searchQuery: '',

  setSelectedDate: (date) => set({ selectedDate: date }),
  setFilterValue: (value) => set({ filterValue: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  
}));
