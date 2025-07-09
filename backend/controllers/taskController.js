import Task from "../models/task.js";
import * as itineraryService from "../services/planetService.js";
import * as eventService from "../services/petService.js";
import {sendNotImplementedError} from "../app.js";
import * as taskService from "../services/taskService.js";

export async function getAllTasks(req, res) {
  // sendNotImplementedError(res);
  try {
    console.log("###### /tasks: Getting all tasks ######");
    const tasks = await taskService.getAllTasks();
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found.' });
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error('getAllTasks failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function findTaskById(req, res) {
  // sendNotImplementedError();
  try {
    console.log("###### /tasks: Getting task by id ######");
    const task = await taskService.findTaskById(req.params.id);
    if (!task || task.length === 0) {
      return res.status(404).json({ message: 'No task found.' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error('getAllTasks failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export function findTaskByUserId(conn, req, res) {
  sendNotImplementedError();
}


export function findItinerariesByName(conn, req, res) {
  try {
    itineraryService.findItinerariesByName(
      conn,
      req.params.itineraryName,
      (result) => {
        if (result.length === 1) {
          res.status(200);
        } else if (result.length === 0) {
          res.status(403);
        }
        res.send(result);
      }
    );
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export function findItinerariesByUserId(conn, req, res) {
  try {
    console.log("finding itineraries by userId", req.params.userId);
    itineraryService.findItinerariesByUserId(
      conn,
      req.params.userId,
      (result) => {
        if (result.length === 1) {
          res.status(200);
        } else if (result.length === 0) {
          res.status(404);
        }
        console.log("found itinerary:", result);
        res.send(result);
      }
    );
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export function createTask(conn, req, res) {
  try {
    const userId = req.params.userId;
    const itinerary = new Itinerary(
      req.body.name,
      userId,
      req.body.startDate,
      req.body.endDate,
      req.body.createdAt,
      req.body.updatedAt,
      req.body.type
    );
    const events = req.body.events;
    if (events) {
      console.log("itinerary", itinerary);
      console.log("events", events);
      console.log("userId", userId);
      itineraryService.createItinerary(conn, itinerary, (result) => {
        const itineraryId = result.insertId.toString();

        console.log("itineraryId", itinerary);
        let updatedEvents = [];
        for (let e of events) {
          updatedEvents.push([e[0], itineraryId, e[1], e[2]]);
        }
        console.log("updated events", updatedEvents);

        eventService.createEvents(conn, updatedEvents, (result) => {
          res.status(200);
        });
      });
    } else {
      res.status(400);
      res.send({ error: "missing events" });
    }
  } catch (code) {
    res.status(code);
  } finally {
    res.send();
  }
}

export async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { task } = req.body;
    console.log("request parameters", req.params);
    console.log("request body", req.body);

    // Check if task was provided in request body
    if (!task) {
      return res.status(400).json({message: `No object 'task' provided in request body`});
    }

    // Get current task from DB, to update the changed fields only
    const currentTask = await taskService.findTaskById(taskId);
    if (!currentTask || currentTask.length === 0) {
      return res.status(404).json({message: `Task does not exist`});
    }

    const existingTask = currentTask[0];

    const updatedTask = new Task (
      task.title || existingTask.title,
        task.description || existingTask.description,
      task.score || existingTask.score,
      task.level || existingTask.level,
      task.priority || existingTask.priority,
      task.recommendation || existingTask.recommendation,
      task.categoryId || existingTask.categoryId,
      task.habitId || existingTask.habitId,
      task.dueAt || existingTask.dueAt
    )

    console.log(updatedTask);

    const result = await taskService.updateTask(taskId, updatedTask);

    // Optionally re-fetch the updated user
    const fetchedTask = await taskService.findTaskById(taskId);
    return res.status(200).send({
      message: 'Task updated successfully',
      task: fetchedTask[0],
    });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export function deleteTask(conn, req, res) {
  sendNotImplementedError();
  /*try {
    const itineraryId = req.params.itineraryId;
    console.log("itineraryId", itineraryId);

    eventService.deleteEvents(conn, itineraryId, (result) => {
      if (result) {
        itineraryService.deleteItinerary(conn, itineraryId, (result) => {
          if (result) {
            res.status(204);
          } else {
            res.status(500);
          }
        });
      } else {
        res.status(500);
      }
    });
  } catch (code) {
    res.status(code);
  } finally {
    res.send();
  }*/
}
