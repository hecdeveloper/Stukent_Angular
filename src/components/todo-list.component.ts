import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService, todoListItem } from '../services/list.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoItems: todoListItem[] = [];
  newTaskTitle: string = '';

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.get().subscribe((items) => {
      this.todoItems = items;
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: todoListItem = {
        id: Date.now().toString(),
        title: this.newTaskTitle,
        completed: false,
      };
      this.todoItems.push(newTask);
      this.newTaskTitle = '';
    }
  }

  toggleComplete(task: todoListItem) {
    task.completed = !task.completed;
    if (task.subTodos) {
      task.subTodos.forEach((subTask) => (subTask.completed = task.completed));
    }
  }

  addSubTask(parentTask: todoListItem) {
    const subTaskTitle = prompt('Enter sub-task title:');
    if (subTaskTitle && subTaskTitle.trim()) {
      const newSubTask: todoListItem = {
        id: `${parentTask.id}-${Date.now()}`,
        title: subTaskTitle,
        completed: false,
      };
      if (!parentTask.subTodos) {
        parentTask.subTodos = [];
      }
      parentTask.subTodos.push(newSubTask);
    }
  }
}
