import * as habitService from "../services/habitService.js";
import {sendNotImplementedError} from "../app.js";

export function getAllHabits(conn, req, res) {
    sendNotImplementedError(res);
    /*try {
      /!*
    console.log("getting all habits");
    habitService.getAllHabits(conn, (result) => {
      if (result) {
        res.status(200);
      }
      res.send(result);
    });
    *!/
  } catch (code) {
    res.status(code);
    res.send();
  }*/
}

export function getTaskRecommendations(conn, req, res) {
    sendNotImplementedError(res);
    /*
    try {
      habitService.getTaskRecommendations(
          conn,
          req.body.habit,
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
  */
}

export function getHabitCategories(conn, req, res) {
    sendNotImplementedError(res);
    /*try {
      habitService.getHabitCategories(
        conn,
        req.params.postId,
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
  }*/
}

/*
export function createPostImage(conn, req, res) {
  try {
    let postImage = new TaskRecommendation(req.body.postId, req.body.userId, req.body.imagePath);
    habitService.createPostImage(conn, postImage,(result) => {
      if (result.length === 1) {
        res.status(200);
      } else if (result.length === 0) {
        res.status(403);
      }
      res.send(result);
    });
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export async function uploadImage(req, res) {
  res.status(200);
  return res.send("Uploaded file");
}
*/