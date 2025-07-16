export default class UserTask {
  constructor(title, completed, description, score, priority, recommendation, categoryId, habitId, dueAt) {
    this.title = title;
    this.completed = completed;
    this.description = description;
    this.score = score;
    this.priority = priority;
    this.recommendation = recommendation;
    this.categoryId = categoryId;
    this.habitId = habitId;
    this.dueAt = dueAt;
  }
}