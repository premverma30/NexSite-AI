import Website from "../models/website.model.js";

class WebsiteRepository {
  async createWebsite(data) {
    return Website.create(data);
  }

  async findByIdAndUser(id, userId) {
    return Website.findOne({ _id: id, user: userId });
  }

  async findBySlug(slug) {
    return Website.findOne({ slug }).lean();
  }

  async findAllByUser(userId) {
    return Website.find({ user: userId }).sort({ updatedAt: -1 }).lean();
  }

  async save(websiteDoc) {
    return websiteDoc.save();
  }
}

export default new WebsiteRepository();
