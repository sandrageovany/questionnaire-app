// server/models/user-model.js

// Temporary in-memory storage (this resets when you restart the server)
let users = [];

export default {
  findOne: async (query) => {
    if (query.username) {
      return users.find(u => u.username === query.username) || null;
    }
    if (query.email) {
      return users.find(u => u.email === query.email) || null;
    }
    return null;
  },

  create: async (userData) => {
    const newUser = { id: Date.now(), ...userData };
    users.push(newUser);
    return newUser;
  },

  findAll: async () => users,
};
