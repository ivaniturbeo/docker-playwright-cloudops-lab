const { test, expect } = require('@playwright/test');

test('user can create a todo item', async ({ page }) => {
  // Open app via proxy
  await page.goto('/');

  // Basic sanity: page loads
  await expect(page).toHaveTitle(/Todo/i);

  // Add todo
  const todo = `release-val-${Date.now()}`;

  await page.fill('input', todo);
  await page.keyboard.press('Enter');

  // Verify todo appears
  await expect(page.locator(`text=${todo}`)).toBeVisible();
});
test('user can delete a todo item', async ({ page }) => {
  const todo = `delete-${Date.now()}`;

  await page.goto('/');

  await page.fill('input', todo);
  await page.keyboard.press('Enter');

  const item = page.locator(`text=${todo}`);

  // Click delete button relative to this item
  await item.locator('..').getByRole('button', { name: 'Remove Item' }).click();

  await expect(page.locator(`text=${todo}`)).toHaveCount(0);
});
test('todo persists after refresh', async ({ page }) => {
  const todo = `persist-${Date.now()}`;

  await page.goto('/');

  await page.fill('input', todo);
  await page.keyboard.press('Enter');

  await page.reload();

  await expect(page.locator(`text=${todo}`)).toBeVisible();
});

test('empty todo is not added', async ({ page }) => {
  await page.goto('/');

  const beforeCount = await page.locator('li').count();

  await page.keyboard.press('Enter');

  const afterCount = await page.locator('li').count();

  expect(afterCount).toBe(beforeCount);
});

test('user can add multiple todos', async ({ page }) => {
  const todo1 = `todo1-${Date.now()}`;
  const todo2 = `todo2-${Date.now()}`;

  await page.goto('/');

  const input = page.locator('input');

  await input.fill(todo1);
  await input.press('Enter');

  await expect(page.locator(`text=${todo1}`)).toBeVisible();

  await input.fill(todo2);
  await input.press('Enter');

  await expect(page.locator(`text=${todo2}`)).toBeVisible();
});