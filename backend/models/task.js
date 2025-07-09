export default class Task {
  constructor(title, description, score, level, priority, recommendation, categoryId, habitId, dueAt) {
    this.title = title;
    this.description = description;
    this.score = score;
    this.level = level;
    this.priority = priority;
    this.recommendation = recommendation;
    this.categoryId = categoryId;
    this.habitId = habitId;
    this.dueAt = dueAt;
  }
}
