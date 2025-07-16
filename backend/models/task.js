export default class Task {
  constructor(title, completed, description, score, priority, recommendation, categoryId, habitId, dueAt) {
    this.title = title;
    this.habitId = habitId;
    this.completed = completed;
    this.description = description;
  }
}
