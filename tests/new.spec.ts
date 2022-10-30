import { test, expect, type Page } from '@playwright/test';
import { TodoAppPage } from '../pages/todo-page';

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://demo.playwright.dev/todomvc');
// });

const TODO_ITEMS = [
  'Test Automation Assignment',
  'Manual Test Assignment A',
  'Manual Test Assignment B'
];

const emptyTodo = ' ';

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();

    // Create 1st todo.
    await todo.addNewTodo(TODO_ITEMS[0]);

    // Make sure the list only has one todo item.
    await expect(todo.todoLabel).toHaveText([
      TODO_ITEMS[0]
    ]);

    // Create 2nd todo.
    await todo.addNewTodo(TODO_ITEMS[1]);

    // Make sure the list now has two todo items.
    await expect(todo.todoLabel).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1]
    ]);
  });

  test('should not allow me to add an empty todo item', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();

    // Create 1st todo.
    await todo.addNewTodo(emptyTodo);

    // Make sure the list only has one todo item.
    await expect(todo.todoLabel).not.toHaveText([
      emptyTodo
    ]);
  }); 
});



