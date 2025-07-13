import * as moodService from "../services/moodService.js";

export async function getAllMoodTypes(req, res) {
  try {
    const moods = await moodService.getAllMoodTypes();
    if (!moods || moods.length === 0) {
      return res.status(404).json({ message: 'No mood found.' });
    }
    res.status(200).json(moods);
  } catch (err) {
    console.error('getAllMoodTypes failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}


export async function insertMoodLog(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await moodService.logMood(username, email, password);

    if (user) {
      res.status(201).json({ message: 'User created successfully', user });
    } else {
      res.status(409).json({ error: 'User already exists' });
    }
  } catch (err) {
    console.error('Signup failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getMoodLogs(req, res) {
    try {
      const {userId} = req.params;
      const logs = await moodService.getMoodLogsByUser(userId);
      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch mood logs', error: err.message });
    }
}

export async function updateMoodLog(req, res) {
  const { userId } = req.params;
  const { newEmail } = req.body;
  try {
    // Check if the email is occupied
    const existing = await moodService.findUserByEmail(newEmail);
    console.log(existing);

    if (existing.length!==0 && existing.id !== parseInt(userId)) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const result = await moodService.updateUserById(userId, 'email', newEmail);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function deleteMoodLog(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await moodService.deleteUser(userId);

    // Deletion failed
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Deletion succeed
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
