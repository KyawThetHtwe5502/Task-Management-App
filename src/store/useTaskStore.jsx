import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const INITIAL_TASKS = [
  {
    id: uuidv4(),
    title: 'Marketing Campaign UIs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'todo',
    category: 'blue',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    notifications: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Localization',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'todo',
    category: 'blue',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:00',
    notifications: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Express Bus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'todo',
    category: 'blue',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '11:00',
    endTime: '12:00',
    notifications: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Design for home page',
    description: 'No additional text',
    status: 'complete',
    category: 'green',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '13:00',
    endTime: '14:00',
    notifications: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Onboarding',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'processing',
    category: 'yellow',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '14:00',
    endTime: '15:00',
    notifications: false,
    createdAt: new Date().toISOString(),
  },
];

export const useTaskStore = create((set, get) => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) || INITIAL_TASKS,
  selectedDate: new Date(),
  filterValue: '',
  searchQuery: '',

  setSelectedDate: (date) => set({ selectedDate: date }),
  setFilterValue: (value) => set({ filterValue: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addTask: (task) => {
    const newTask = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  updateTask: (id, updatedTask) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },
}));
