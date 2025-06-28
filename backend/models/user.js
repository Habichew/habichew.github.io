export default class User {
  constructor(email, username, password, mood, petId, score, fuelStatus, currentPlanetId, visitedPlanets, finishedPlanets, userHabitsId, tasksNum) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.mood = mood;
    this.petId = petId;
    this.score = score;
    this.fuelStatus = fuelStatus;
    this.currentPlanetId = currentPlanetId;
    this.visitedPlanets = visitedPlanets;
    this.finishedPlanets = finishedPlanets;
    this.userHabitsId = userHabitsId;
    this.tasksNum = tasksNum;
  }
}
