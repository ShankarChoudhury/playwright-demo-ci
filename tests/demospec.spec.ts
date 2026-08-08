import {test} from './fixture';

/* test.beforeEach(async ({ page }) => {
   console.log("Hello World");
}); */

test('Demo 1', async ({ helloworld }) => {
    console.log("Time now is :"+helloworld);
  console.log("Test Demo 1");
});

test('Demo 2', async ({ newworld }) => {
  console.log("Test Demo 2");
});
