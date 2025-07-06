// import Event from "../models/userHabit.js";
import * as petService from "../services/petService.js";
import {sendNotImplementedError} from "../app.js";

export function findPetByUserId(conn, req, res) {
  sendNotImplementedError(res);
    /*try {
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
  }*/
}

export function createPet(conn, req, res) {
  sendNotImplementedError(res);
    /*try {
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
  }*/
}

export function updatePet(conn, req, res) {
    sendNotImplementedError(res);
    /*
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
     */
}

export function deletePet(conn, req, res) {
    sendNotImplementedError(res);
}