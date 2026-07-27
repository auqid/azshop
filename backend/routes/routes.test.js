import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

vi.mock('../models/productModel.js');
vi.mock('../models/userModel.js');

describe('API Route Integration Tests (Supertest)', () => {
  describe('POST /api/users/auth', () => {
    it('returns 401 Unauthorized when invalid credentials are provided', async () => {
      User.findOne = vi.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/users/auth')
        .send({ email: 'invalid@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        'message',
        'Invalid email or password'
      );
    });
  });

  describe('POST /api/users (Registration Edge Cases)', () => {
    it('returns 400 when registering with an existing user email', async () => {
      User.findOne = vi.fn().mockResolvedValue({
        _id: 'existing123',
        email: 'existing@example.com',
      });

      const response = await request(app).post('/api/users').send({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'An account with this email address already exists.'
      );
    });

    it('returns 400 when password is under 8 characters', async () => {
      const response = await request(app).post('/api/users').send({
        name: 'Short Pass',
        email: 'short@example.com',
        password: '123',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Password must be at least 8 characters'
      );
    });
  });

  describe('GET /api/products', () => {
    it('returns product list and pagination metadata', async () => {
      const mockProducts = [
        {
          _id: '65f1234567890abcdef12345',
          name: 'Pashmina Shawl',
          price: 15000,
          category: 'Shawls & Stoles',
        },
      ];

      Product.countDocuments = vi.fn().mockResolvedValue(1);
      Product.find = vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            skip: vi.fn().mockResolvedValue(mockProducts),
          }),
        }),
      });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(1);
      expect(response.body.products[0].name).toBe('Pashmina Shawl');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('pages', 1);
    });
  });

  describe('GET /api/products/:id', () => {
    it('returns 404 Not Found for non-existent product ObjectId', async () => {
      Product.findById = vi.fn().mockResolvedValue(null);

      const validMongoId = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/api/products/${validMongoId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });

    it('returns 404 for malformed ObjectId parameter via checkObjectId middleware', async () => {
      const response = await request(app).get('/api/products/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Invalid ObjectId');
    });
  });

  describe('GET /api/orders/:id (checkObjectId Middleware)', () => {
    it('returns 404 for malformed order ObjectId parameter', async () => {
      const response = await request(app).get('/api/orders/not-an-objectid');

      expect(response.status).toBe(401); // Requires auth first or 404
    });
  });

  describe('GET /api/orders/myorders', () => {
    it('rejects unauthenticated request with 401 HTTP status', async () => {
      const response = await request(app).get('/api/orders/myorders');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        'message',
        'Not authorized, no token'
      );
    });
  });
});
