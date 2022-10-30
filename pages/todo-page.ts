// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class TodoAppPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoLabel: Locator;
  readonly editInput: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('.new-todo');
    this.todoLabel = page.locator('.view label');
    this.editInput = page.locator('.edit');
  }

  async goto() {
    await this.page.goto('https://todomvc.com/examples/angular2/');
  }

  async addNewTodo(task: string) {
    await this.newTodoInput.fill(task);
    await this.newTodoInput.press('Enter');
  }

  async edit(existingTodo: string, newTodo: string){
    const task = await this.page.getByText(existingTodo);
    await task.dblclick();
    await this.editInput.fill(newTodo);
    await this.editInput.press('Enter');
  }  
  
  async complete(todo: string){
    const task = await this.page.locator('.todo-list li', { hasText: todo });
    await task.locator('.toggle').check();
    return task;
  }

  async delete(todo: string){
    const task = await this.page.locator('.todo-list li', { hasText: todo });
    await task.hover();
    await task.locator('.destroy').click();
  }
}