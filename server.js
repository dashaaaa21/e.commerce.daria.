import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let orders = [];
let reviews = [];

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === parseInt(req.params.productId));
  res.json(productReviews);
});

app.post('/api/reviews', (req, res) => {
  const review = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  reviews.push(review);
  res.status(201).json(review);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
