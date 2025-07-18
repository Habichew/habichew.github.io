import Task from "../models/task.js";
import * as eventService from "../services/petService.js";
import {sendNotImplementedError} from "../app.js";
import * as taskService from "../services/taskService.js";
import * as userService from "../services/userService.js";
import * as habitService from "../services/habitService.js";

export async function getTaskListByUserId(req, res) {
    try {
        const {userId} = req.params;
        const tasks = await taskService.getTaskListByUserId(userId);

        return res.status(200).send(tasks);
    } catch (err) {
        console.error('getTasksByUserId failed:', err);
        res.status(500).json({message:"Failed to fetch task list by user ID", error: err.message});
    }
}

export async function findUserTaskById(req, res) {
    try {
        const {userTaskId} = req.params;

        const task = await taskService.findUserTaskById(userTaskId);
        if (!task) {
            return res.status(404).send({message: "No task found"});
        }
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send({ message:"Find task by userTaskId error", error: err.message });
    }
}


export async function createTask(req, res) {
    try {
        const {task} = req.body;

        // Check if task was provided in request body
        if (!task) {
            return res.status(400).json({ message: "No object 'task' provided in request body" });
        }
        if (!task.customTitle && !task.taskId) {
            return res.status(400).json({ message: "Choose a preset task or input a custom task title!" })
        }

        const newUserTaskId = await taskService.createTask(task);
        const newTask = await taskService.findUserTaskById(newUserTaskId);
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Create error:', err);
        return res.status(500).json({message:"Failed to create a task", error: err.message});
    }
}

export async function updateTask(req, res) {
    try {
        const {taskId} = req.params;
        const {task} = req.body;

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

        const updatedTask = new Task(
            task.title || existingTask.title,
            task.completed != null ? task.completed : existingTask.completed,
            task.description || existingTask.description,
            task.score || existingTask.score,
            task.priority || existingTask.priority,
            task.recommendation || existingTask.recommendation,
            task.categoryId || existingTask.categoryId,
            task.habitId || existingTask.habitId,
            task.dueAt || existingTask.dueAt
        )

        // check if task has a valid habit
        const habitResult = await habitService.getHabitById(task.habitId);
        if (!habitResult || habitResult.length === 0) {
            return res.status(404).json({message: `Task does not have a valid habit id`});
        }

        if (task.completed && !existingTask.completed) {
            // update last time user completed any task in user table
            const userResult = await userService.updateUserTaskLastCompleted(habitResult[0].userId);
        }

        const result = await taskService.updateTask(taskId, updatedTask);

        // Optionally re-fetch the updated task
        const fetchedTask = await taskService.findTaskById(taskId);
        return res.status(200).send({
            message: 'Task updated successfully',
            task: fetchedTask[0],
        });
    } catch (err) {
        console.error('Update error:', err);
        return res.status(500).json({error: 'Internal server error'});
    }
}

export async function deleteTask(req, res) {
    try {
        const {userId, userTaskId} = req.params;

        const deleted = await taskService.deleteTask(userTaskId);
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).send({message: 'Task deleted successfully'});
    } catch (err) {
        console.error('Delete error:', err);
        return res.status(500).json({ message:"Failed to delete the task", error: err.message });
    }
}

export async function getPresetTasks(req, res) {
    try {
        const { habitId } = req.params;
        const task = await taskService.getPresetTasks(habitId);
        if (!task || task.length === 0) {
            return res.status(404).json({message: 'No preset task found.'});
        }
        res.status(200).json(task);
    } catch (err) {
        console.error('findPresetTaskById failed:', err);
        return res.status(500).json({message: 'Failed to fetch preset tasks', error: err.message});
    }
}
