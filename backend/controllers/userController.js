import User from "../models/user.js";
import * as userService from "../services/userService.js";
import bcrypt from "bcrypt";


export async function getAllUsers(req, res) {
  try {
    console.log("###### /users: Getting all users ######");
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error('getAllUsers failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}


export async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await userService.createUser(username, email, password);

    if (user) {
      res.status(201).json({ message: 'User created successfully', user });
    } else {
      res.status(409).json({ error: 'Email already exists' });
    }
  } catch (err) {
    console.error('Signup failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function findUser(req, res) {
  try {
    const {email, password} = req.body;
    await userService.findUserByEmail(email, (result) => {
      console.log("###### /users/login: find user by email result ######", result);
      if (result.length > 0) {
        bcrypt.compare(
          password,
          result[0].password,
          function (err, compResult) {
            if (compResult) {
              console.log("Password match");
              res.status(200);
              res.send(result);
            } else {
              console.log("Password does not match");
              console.log("password", password);
              console.log("hash", result[0].password);
              res.status(400);
              res.send({ error: "incorrect password" });
            }
          }
        );
      } else {
        res.status(404);
        res.send({ error: "incorrect user" });
      }
    });
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export async function findUserById(conn, req, res) {
  try {
    await userService.findUserById(conn, req.params.userId, (result) => {
      if (result.length === 1) {
        res.status(200);
      } else if (result.length === 0) {
        res.status(404);
      }
      res.send(result);
    });
  } catch (code) {
    res.status(code);
    res.send();
  }
}

export async function findUserByUsername(conn, req, res) {
  try {
    await userService.findUserByUsername(
      conn,
      req.params.profileName,
      (result) => {
        if (result.length === 1) {
          res.status(200);
        } else if (result.length === 0) {
          res.status(404);
        }
        res.send(result);
      }
    );
  } catch (code) {
    res.status(code);
    res.send();
  }
}

/*export async function createUser(conn, req, res) {
  try {
    const user = new User(
      req.body.email,
      req.body.password,
      req.body.profileName,
      req.body.profileImage
    );
    await userService.findUserByEmail(conn, user.email, (result) => {
      if (result.length > 0) {
        res.status(400);
        res.send({ error: "user already exists" });
      } else {
        userService.createUser(conn, user, (result) => {
          if (result) {
            res.status(200);
            res.send({ success: "registered new user" });
          } else {
            res.status(500);
            res.send({ error: "failed to register new user" });
          }
        });
      }
    });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
}*/

export async function updateUser(conn, req, res) {
  try {
    const id = req.params.userId;

    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;
    const newProfileName = req.body.newProfileName;
    const newProfileImage = req.body.newProfileImage;

    const user = new User(
      newEmail,
      newPassword,
      newProfileName,
      newProfileImage
    );
    await userService.findUserByEmail(conn, newEmail, (result) => {
      if (result[0]) {
        res
          .status(400)
          .send({ error: "user with new email address already exists" });
      } else {
        userService.updateUser(conn, id, user, (result) => {
          if (result) {
            res.status(200).send();
          } else {
            res.status(500).send({ error: "failed to update user" });
          }
        });
      }
    });
  } catch (code) {
    res.status(code).send();
  }
}

export async function subscribeUserToNewsletter(conn, req, res) {
  try {
    const id = req.params.userId;

    await userService.subscribeUserToNewsletter(conn, id, (result) => {
        if (result) {
          res.status(200).send({ success: "subscribed user to newsletter" });
        } else {
          res.status(500).send({ error: "failed to subscribe user to newsletter" });
        }
    });

  } catch (code) {
    res.status(code);
    res.send();
  }
}

export async function updateProfileName(conn, req, res) {
  try {
    const userId = req.params.userId;
    const newProfileName = req.body.newProfileName;
    console.log("userId", userId);
    console.log("profileName", newProfileName);

    await userService.updateProfileName(
      conn,
      userId,
      newProfileName,
      (result) => {
        if (result) {
          res.status(204).send({ success: "updated user profile name" });
        }
      }
    );
  } catch (code) {
    res.status(code).send();
  }
}

export async function updateProfileImage(conn, req, res) {
  try {
    const userId = req.params.userId;
    const newProfileImage = req.body.newProfileImage;
    console.log("userId", userId);
    console.log("profileImage", newProfileImage);

    await userService.updateProfileName(conn, userId, newProfileName, () => {
      res.status(204);
      res.send();
    });
  } catch (code) {
    res.status(code);
  } finally {
    res.send();
  }
}

export async function deleteUser(conn, req, res) {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);

    await userService.deleteUser(conn, userId, () => {
      res.status(204);
      res.send();
    });
  } catch (code) {
    res.status(code);
    res.send();
  }
}
