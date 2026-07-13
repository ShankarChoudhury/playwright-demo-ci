import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Define the type for the test data


// Load test data from JSON file
const testDataPath = path.resolve(__dirname, "data", "salary_insights.json");
let salaryTestData= TestData[];

try {
  const rawData = fs.readFileSync(testDataPath, "utf8");
  salaryTestData = JSON.parse(rawData) as TestData[];
} catch (error) {
  console.error("Error reading or parsing salary_insights.json:", error);
  process.exit(1); // Exit the process with an error code
}

test.describe("Salary Insights Tests From a JSON file", () => {
  salaryTestData.forEach(({ role, country }) => {
    test(`Should display correct compensation info for ${role} in ${country}`, async ({ page }) => {
      await page.goto("/dev/salary-insights");
      await page.waitForLoadState("load");
      // Select Role
      await page.locator('role-dropdown-selector').click();
      await page.fill('role-input-selector', role);
      await page.click(`text=${role}`);
      
      // ... (rest of your test logic)

     });
  });
});