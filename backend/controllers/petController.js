// import Event from "../models/userHabit.js";
import * as petService from "../services/petService.js";

export function getAllCollaborators(conn, req, res) {
  try {
    petService.getAllCollaborators(conn, (result) => {
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

export function findCollaboratorsByItineraryId(conn, req, res) {
  try {
    petService.findCollaboratorsByItineraryId(
      conn,
      req.params.itineraryId,
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

export function findItinerariesByCollaboratorUserId(conn, req, res) {
  try {
    petService.findItinerariesByCollaboratorUserId(
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
