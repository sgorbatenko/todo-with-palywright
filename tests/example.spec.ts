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

  test('should allow me to edit todo items', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();

    await createTodos(TODO_ITEMS, todo);
    const newTodo = TODO_ITEMS[1] + 'Edited';
    await todo.edit(TODO_ITEMS[1], newTodo);

    // Explicitly assert the new text value.
    await expect(todo.todoLabel).toHaveText([
      TODO_ITEMS[0],
      newTodo,
      TODO_ITEMS[2]
    ]);
  });


  test('should remove todo item if I update it with empty value', async ({ page }) => {
    const todo = new TodoAppPage(page);
    await todo.goto();


    await createTodos(TODO_ITEMS, todo);
    await todo.edit(TODO_ITEMS[1], emptyTodo);

    // Explicitly assert the new text value.
    await expect(todo.todoLabel).not.toHaveText([
      TODO_ITEMS[1],
      emptyTodo
    ]);
  });

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


