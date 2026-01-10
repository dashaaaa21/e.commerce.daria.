import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data');
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

const ordersFile = path.join(dataPath, 'orders.json');
const reviewsFile = path.join(dataPath, 'reviews.json');
const usersFile = path.join(dataPath, 'users.json');

const readData = (file) => {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
    return [];
  } catch (error) {
    return [];
  }
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

app.get('/api/orders', (req, res) => {
  const orders = readData(ordersFile);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readData(ordersFile);
  const order = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  orders.push(order);
  writeData(ordersFile, orders);
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const orders = readData(ordersFile);
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.patch('/api/orders/:id', (req, res) => {
  const orders = readData(ordersFile);
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  orders[index] = { ...orders[index], ...req.body };
  writeData(ordersFile, orders);
  res.json(orders[index]);
});

app.delete('/api/orders/:id', (req, res) => {
  const orders = readData(ordersFile);
  const filtered = orders.filter(o => o.id !== parseInt(req.params.id));
  writeData(ordersFile, filtered);
  res.json({ message: 'Order deleted' });
});

app.get('/api/reviews/:productId', (req, res) => {
  const reviews = readData(reviewsFile);
  const productReviews = reviews.filter(r => r.productId === parseInt(req.params.productId));
  res.json(productReviews);
});

app.post('/api/reviews', (req, res) => {
  const reviews = readData(reviewsFile);
  const review = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  reviews.push(review);
  writeData(reviewsFile, reviews);
  res.status(201).json(review);
});

app.get('/api/users', (req, res) => {
  const users = readData(usersFile);
  res.json(users.map(u => ({ id: u.id, email: u.email, name: u.name })));
});

app.post('/api/users', (req, res) => {
  const users = readData(usersFile);
  const existingUser = users.find(u => u.email === req.body.email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const user = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeData(usersFile, users);
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
});

app.get('/api/stats', (req, res) => {
  const orders = readData(ordersFile);
  const reviews = readData(reviewsFile);
  const users = readData(usersFile);
  
  const stats = {
    totalOrders: orders.length,
    totalReviews: reviews.length,
    totalUsers: users.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
  };
  
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/orders');
  console.log('  POST   /api/orders');
  console.log('  GET    /api/orders/:id');
  console.log('  PATCH  /api/orders/:id');
  console.log('  DELETE /api/orders/:id');
  console.log('  GET    /api/reviews/:productId');
  console.log('  POST   /api/reviews');
  console.log('  GET    /api/users');
  console.log('  POST   /api/users');
  console.log('  GET    /api/stats');
});
