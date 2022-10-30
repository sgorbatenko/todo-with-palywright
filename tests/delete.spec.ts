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

test.describe('Delete Todo', () => {
   test('should allow me to delete todo items', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();
    await createTodos(TODO_ITEMS, todo);
    await todo.delete(TODO_ITEMS[2]);

    // Explicitly assert the new text value.
    await expect(todo.todoLabel).not.toHaveText([
      TODO_ITEMS[2]
    ]);
  });
});
async function createTodos(todoTasks: string[], page: TodoAppPage) {
  for (const task of todoTasks) {
    await page.addNewTodo(task);
  }
}


