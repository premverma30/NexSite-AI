import websiteRepository from "../repositories/website.repository.js";
import userRepository from "../repositories/user.repository.js";
import aiService from "./ai.service.js";
import AppError from "../errors/AppError.js";
import { generateSlug } from "../utils/slugify.js";

class WebsiteService {
  async generateWebsite(userId, prompt) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) throw new AppError("User not found", 404);

      if (user.credits < 50) {
        throw new AppError("Insufficient credits to generate a website. You need 50.", 402);
      }

      // Call AI Service
      const aiResult = await aiService.createWebsite(prompt);
      
      console.log("AI RESPONSE:", aiResult);

      if (!aiResult || typeof aiResult !== 'object') {
        throw new AppError("AI response is invalid or undefined", 502);
      }

      // Defensive array check for conversation even though we create it here
      const conversationHistory = Array.isArray([]) ? [] : [];
      conversationHistory.push({ role: "user", content: prompt });
      conversationHistory.push({ role: "ai", content: aiResult.message || "Website generated." });

      const title = prompt.slice(0, 60);

      // Save to DB
      const websiteData = {
        user: user._id,
        title,
        latestCode: aiResult.code || "<!-- No code generated -->",
        conversation: conversationHistory,
        slug: generateSlug(title), // Generates standard slug on creation
      };

      const website = await websiteRepository.createWebsite(websiteData);

      // Deduct credits
      await userRepository.updateCredits(user._id, user.credits - 50);

      return {
        websiteId: website._id,
        slug: website.slug,
        remainingCredits: user.credits - 50,
      };
    } catch (error) {
      console.error("Service Layer Error (generateWebsite):", error);
      throw error;
    }
  }

  async updateWebsite(websiteId, userId, prompt) {
    const website = await websiteRepository.findByIdAndUser(websiteId, userId);
    if (!website) throw new AppError("Website not found or unauthorized", 404);

    const user = await userRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    if (user.credits < 25) {
      throw new AppError("Insufficient credits to update a website. You need 25.", 402);
    }

    // Call AI Service
    const aiResult = await aiService.updateWebsite(website.latestCode, prompt);

    // Update conversation and code
    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: aiResult.message }
    );
    website.latestCode = aiResult.code;
    await websiteRepository.save(website);

    // Deduct credits
    await userRepository.updateCredits(user._id, user.credits - 25);

    return {
      message: aiResult.message,
      code: aiResult.code,
      remainingCredits: user.credits - 25,
    };
  }

  async deployWebsite(websiteId, userId) {
    const website = await websiteRepository.findByIdAndUser(websiteId, userId);
    if (!website) throw new AppError("Website not found or unauthorized", 404);

    // Slug is now always generated on creation, this is just a safety fallback
    if (!website.slug) {
      website.slug = generateSlug(website.title);
    }

    website.deployed = true;
    website.deployUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`;
    await websiteRepository.save(website);

    return { url: website.deployUrl, slug: website.slug };
  }

  async getWebsiteById(websiteId, userId) {
    const website = await websiteRepository.findByIdAndUser(websiteId, userId);
    if (!website) throw new AppError("Website not found", 404);
    return website;
  }

  async getAllWebsites(userId) {
    return websiteRepository.findAllByUser(userId);
  }

  async getWebsiteBySlug(slug) {
    const website = await websiteRepository.findBySlug(slug);
    if (!website) throw new AppError("Website not found", 404);
    return website;
  }
}

export default new WebsiteService();
