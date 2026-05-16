// Mock API Layer (Offline Mode)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let mockUsers = [
  { id: '1', email: 'employer@techcorp.kg', password: 'password', role: 'employer', name: 'TechCorp Ltd.' }
];

let mockVacancies = [
  { id: '101', employerId: '1', company: 'TechCorp Ltd.', title: 'Frontend Engineer', format: 'Удаленка', salaryRange: '100,000 сом', vacancyRate: 85 }
];

let mockApplications = [
  {
    _id: 'a1',
    seekerId: { name: 'Алексей Смирнов', email: 'alex@example.com' },
    vacancyId: { title: 'Frontend Engineer', company: 'TechCorp Ltd.' },
    status: 'new',
    matchScore: 94,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    _id: 'a2',
    seekerId: { name: 'Бермет Асанова', email: 'bermet@example.com' },
    vacancyId: { title: 'Data Analyst', company: 'GlobalIT KG' },
    status: 'reviewed',
    matchScore: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    _id: 'a3',
    seekerId: { name: 'Санжар Рустамов', email: 'sanjar@example.com' },
    vacancyId: { title: 'Backend Developer', company: 'TechCorp Ltd.' },
    status: 'interview',
    matchScore: 91,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  },
  {
    _id: 'a4',
    seekerId: { name: 'Елена Ким', email: 'elena@example.com' },
    vacancyId: { title: 'UI/UX Designer', company: 'Creative Studio' },
    status: 'rejected',
    matchScore: 65,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() // 3 days ago
  }
];

export const authAPI = {
  register: async (data) => {
    await delay(800);
    const exists = mockUsers.find(u => u.email === data.email);
    if (exists) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), ...data };
    mockUsers.push(newUser);
    return { token: 'mock-jwt-token', user: newUser };
  },
  login: async (data) => {
    await delay(800);
    const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
    if (!user) throw new Error('Invalid Credentials');
    return { token: 'mock-jwt-token', user };
  }
};

export const vacanciesAPI = {
  getAll: async () => {
    await delay(500);
    return mockVacancies;
  },
  create: async (data) => {
    await delay(800);
    const newVacancy = { id: Date.now().toString(), employerId: '1', company: 'TechCorp Ltd.', ...data };
    mockVacancies.push(newVacancy);
    return newVacancy;
  }
};

export const applicationsAPI = {
  apply: async (data) => {
    await delay(800);
    const newApp = { 
      _id: Date.now().toString(), 
      seekerId: { name: 'Current User' }, 
      vacancyId: { title: 'Frontend Engineer', company: 'TechCorp Ltd.' }, 
      status: 'new', 
      matchScore: data.matchScore,
      createdAt: new Date().toISOString()
    };
    mockApplications.unshift(newApp);
    return newApp;
  },
  getSeekerApps: async () => {
    await delay(500);
    // Return all mock applications so the seeker sees a populated dashboard regardless of account
    return mockApplications;
  },
  getEmployerApps: async () => {
    await delay(500);
    // Return all mock applications so the employer sees a populated kanban board
    return mockApplications;
  },
  updateStatus: async (id, status) => {
    await delay(300);
    const app = mockApplications.find(a => a._id === id);
    if (app) app.status = status;
    return app;
  }
};

