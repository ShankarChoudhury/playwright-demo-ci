import { test, expect } from '@playwright/test';

test('Dummy Test',async ({ request })=>{

  // 1. Send a GET request to the API endpoint
  const response = await request.get('https://fake-json-api.mock.beeceptor.com/users/1');

  // 2. Validate response status
  expect(response.ok()).toBeTruthy();

  // 3. Validate response payload
  const body = await response.json();
  expect(body.name).not.toBeNull();

  // 4. Print the response body for debugging purposes
    console.log("Response Body:", body);
  });