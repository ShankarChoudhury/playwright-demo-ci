import { test, expect } from '@playwright/test';


test.describe('API Check Tests', () => {

test('Get User test',async ({ request })=>{
  const userId: number = 1;
  // 1. Send a GET request to the API endpoint
  //const response = await request.get('https://fake-json-api.mock.beeceptor.com/users/1');
  const response = await request.get(`https://fake-json-api.mock.beeceptor.com/users/${userId}`);
  console.log('Request URL:', response.url());
  
  // 2. Validate response status
  expect(response.ok()).toBeFalsy();

  // 3. Validate response payload
  const body = await response.json();
  console.log('Response Body:', body);
  expect(response.status()).toBe(200);
  expect(typeof body.name).toBe('string');
  expect (body.email).toContain('@');
  // 4. Print the response body for debugging purposes
    console.log("Response Body:", body);
  }); 
});