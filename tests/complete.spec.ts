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

test.describe('Complete Todo', () => {

  test('should allow me to check todo task as completed', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();

    await createTodos(TODO_ITEMS, todo);

    const task = await todo.complete(TODO_ITEMS[0]);

    await expect(task).toHaveClass('completed');

  });

  test('should allow me to edit completed completed task', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();

    await createTodos(TODO_ITEMS, todo);

    const task = await todo.complete(TODO_ITEMS[1]);

    const newTodo = TODO_ITEMS[1] + 'Edited';
    await todo.edit(TODO_ITEMS[1], newTodo);

    // Explicitly assert the new text value.
    await expect(todo.todoLabel).toHaveText([
      TODO_ITEMS[0],
      newTodo,
      TODO_ITEMS[2]
    ]);
    await expect(task).toHaveClass('completed');
  });
});
async function createTodos(todoTasks: string[], page: TodoAppPage) {
  for (const task of todoTasks) {
    await page.addNewTodo(task);
  }
}


