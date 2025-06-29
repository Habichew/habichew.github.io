/*
import * as habitService from "../services/habitService.js";

export function getAllHabits(conn, req, res) {
  try {
    console.log("response:", res);
    console.log("getting all habits");
    habitService.getAllHabits(conn, (result) => {
      if (result) {
        res.status(200);
      }
      res.send(result);
    });
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export function findPostImagesByPostId(conn, req, res) {
  try {
    habitService.findPostImagesByPostId(
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
  }
}

export function findPostImagesByUserId(conn, req, res) {
  try {
    habitService.findPostImagesByUserId(
        conn,
        req.params.userId,
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
