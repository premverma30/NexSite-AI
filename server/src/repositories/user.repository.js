import User from "../models/user.model.js";

class UserRepository {
  async findById(id) {
    return User.findById(id).lean();
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(data) {
    return User.create(data);
  }

  async updateCredits(id, newCredits) {
    return User.findByIdAndUpdate(id, { credits: newCredits }, { new: true });
  }
}

export default new UserRepository();
