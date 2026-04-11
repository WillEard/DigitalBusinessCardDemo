// src/services/cvService.js
import CV from "../models/CV.js";
import User from "../models/User.js";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../constants/errorMessages.js";

export class CVService {
  static async saveCVData(userId, cvData) {
    // Extract fields
    const {
      cardType,
      backgroundColor,
      textColor,
      profilePicture,
      title,
      education,
      experience,
      skills,
      certifications,
      projects,
      languages,
      hobbies,
      achievements,
      resumeData,
      businessData,
      customData,
      customFields,
    } = cvData;

    // Create a new CV document
    const newCV = new CV({
      user_id: userId,
      cardType: cardType || "resume",
      title:
        title ||
        businessData?.companyName ||
        customData?.heading ||
        "Untitled Card",
      backgroundColor: backgroundColor || "#ffffff",
      textColor: textColor || "#000000",
      profilePicture: profilePicture || "",

      // Resume fields
      education: education || "",
      experience: experience || "",
      skills: skills || "",
      certifications: certifications || "",
      projects: projects || "",
      languages: languages || "",
      hobbies: hobbies || "",
      achievements: achievements || "",

      // Business data
      businessData: businessData || {},

      // Custom data
      customData: customData || {},

      // Custom fields
      customFields: Array.isArray(customFields) ? customFields : [],
    });

    await newCV.save();

    return { message: SUCCESS_MESSAGES.CV_SAVED_SUCCESS };
  }

  static async getCVData(userId) {
    // Get ALL CVs for this user (as an array)
    const cvs = await CV.find({ user_id: userId }).sort({ createdAt: -1 });

    // Return as array (even if empty)
    return { cvs: cvs || [] };
  }

  static async getCVDataByUsername(username) {
    // Find user first to get their ID
    // Use case-insensitive search since usernames might have been created before lowercase: true
    console.log("CVService: Looking for user with username:", username);

    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });
    console.log("CVService: User found:", user ? user._id : "NOT FOUND");

    if (!user) {
      // Log all users to debug
      const allUsers = await User.find().select("username email");
      console.log("CVService: All users in DB:", allUsers);
      throw new Error(`User not found: ${username}`);
    }

    // Find ALL CV records for this user (they can have multiple passes)
    const cvs = await CV.find({ user_id: user._id }).sort({ createdAt: -1 });
    console.log("CVService: CVs found:", cvs.length);

    if (!cvs || cvs.length === 0) {
      throw new Error(ERROR_MESSAGES.CV_NOT_FOUND);
    }

    return { cvs };
  }

  static async deleteCV(userId, cvId) {
    // Find and delete the CV by ID and user_id
    const cv = await CV.findOneAndDelete({
      _id: cvId,
      user_id: userId,
    });

    if (!cv) {
      throw new Error(
        "CV not found or you do not have permission to delete it",
      );
    }

    return { message: "CV deleted successfully" };
  }
}
