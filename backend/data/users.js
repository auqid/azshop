import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Aarav Mehta',
    email: 'aarav@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Priya Nair',
    email: 'priya@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rohan Gupta',
    email: 'rohan@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Zara Khan',
    email: 'zara@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Meera Pillai',
    email: 'meera@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Arjun Sharma',
    email: 'arjun@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
