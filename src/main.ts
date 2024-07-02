import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodoListComponent } from './components/todo-list.component';
import { FormsModule } from '@angular/forms';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, FormsModule],
  template: '<app-todo-list></app-todo-list>',
})
export class App {}

bootstrapApplication(App);
