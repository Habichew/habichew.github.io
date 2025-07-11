// import Event from "../models/userHabit.js";
import * as petService from "../services/petService.js";
import {sendNotImplementedError} from "../app.js";
import * as userService from "../services/userService.js";

export async function findPetByUserId(req, res) {
    try {
        const {userId} = req.params;
        const userResult = await userService.findUserById(userId);
        console.log("find user by ID ######", userResult[0]);

        if (userResult.length === 0) {
            res.status(404);
            res.send({error: "User does not exist."})
        } else {
            const user = userResult[0];
            if (user.petId === null) {
                res.status(404);
                res.send({error: "User does not have pet."})
            } else {
                const petId = user.petId;
                console.log("found pet with pet ID", petId);
                const petResult = await petService.findPetById(petId);
                console.log("###### /users/" + userId + "/pet: find pet by user ID ######", petResult);
                if (petResult.length === 1) {
                    res.status(200);
                    res.send(petResult);
                } else if (petResult.length === 0) {
                    res.status(404);
                    res.send({error: "Pet does not exist."})
                }
            }
        }
    } catch (code) {
        res.status(code).send();
    }
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
