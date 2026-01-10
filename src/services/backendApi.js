const BACKEND_URL = 'http://localhost:3002/api';

export const createOrder = async (orderData) => {
  const response = await fetch(`${BACKEND_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};

export const getOrders = async () => {
  const response = await fetch(`${BACKEND_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

export const getOrder = async (id) => {
  const response = await fetch(`${BACKEND_URL}/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
};

export const updateOrder = async (id, updates) => {
  const response = await fetch(`${BACKEND_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update order');
  }
  return response.json();
};

export const createReview = async (reviewData) => {
  const response = await fetch(`${BACKEND_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    throw new Error('Failed to create review');
  }
  return response.json();
};

export const getReviews = async (productId) => {
  const response = await fetch(`${BACKEND_URL}/reviews/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${BACKEND_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};
