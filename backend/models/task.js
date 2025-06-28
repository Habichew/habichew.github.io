export default class Task {
  constructor(description, score, level, priority, recommendation, dueAt) {
    this.description = description;
    this.score = score;
    this.level = level;
    this.priority = priority;
    this.recommendation = recommendation;
    this.dueAt = dueAt;
  }
}
