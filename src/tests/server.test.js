import request from 'supertest';
import app from '../server';

// Test cases for critical endpoints 

describe('Server Endpoints', () => {
    it('should return 200 for the GET / endpoint', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  
    it('should handle 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.statusCode).toBe(404);
    });
  });
  