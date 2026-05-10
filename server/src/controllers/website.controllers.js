import websiteService from "../services/website.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const generateWebsite = asyncHandler(async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    
    if (!req.body || !req.body.prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const { prompt } = req.body;
    
    // Add extra safety check
    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Invalid prompt format" });
    }

    const result = await websiteService.generateWebsite(req.user._id, prompt);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Website Generation Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
});

export const getWebsiteById = asyncHandler(async (req, res) => {
  const website = await websiteService.getWebsiteById(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    data: website,
  });
});

export const changes = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const result = await websiteService.updateWebsite(req.params.id, req.user._id, prompt);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const websites = await websiteService.getAllWebsites(req.user._id);

  res.status(200).json({
    success: true,
    data: websites,
  });
});

export const deploy = asyncHandler(async (req, res) => {
  const result = await websiteService.deployWebsite(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Invalid slug parameter" });
  }

  try {
    const website = await websiteService.getWebsiteBySlug(slug.trim());
    res.status(200).json({
      success: true,
      data: website,
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
});

export const auditSeo = asyncHandler(async (req, res) => {
  const result = await websiteService.auditSeo(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
