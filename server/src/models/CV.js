// src/models/CV.js
import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    // Card type: 'resume' | 'business' | 'custom'
    cardType: {
      type: String,
      enum: ["resume", "business", "custom"],
      default: "resume",
    },
    // ===== RESUME DATA =====
    title: {
      type: String,
      default: "Your CV Title",
    },
    education: {
      type: String,
      default: "Add your education details here",
    },
    experience: {
      type: String,
      default: "Add your work experience here",
    },
    skills: {
      type: String,
      default: "Add your skills here",
    },
    certifications: {
      type: String,
      default: "Add your certifications here",
    },
    projects: {
      type: String,
      default: "Add your projects here",
    },
    languages: {
      type: String,
      default: "Add your languages here",
    },
    hobbies: {
      type: String,
      default: "Add your hobbies here",
    },
    achievements: {
      type: String,
      default: "Add your achievements here",
    },
    // ===== BUSINESS INFORMATION =====
    businessData: {
      companyName: {
        type: String,
        default: "Company Name",
      },
      jobTitle: {
        type: String,
        default: "Job Title",
      },
      phone: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "Add your professional bio here",
      },
      services: {
        type: String,
        default: "List your services or products",
      },
    },
    // ===== CUSTOM INFORMATION =====
    customData: {
      heading: {
        type: String,
        default: "Custom Information",
      },
      sections: [
        {
          title: {
            type: String,
            default: "Section Title",
          },
          content: {
            type: String,
            default: "Add your content here",
          },
          order: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
    // ===== CUSTOM FIELDS (USER-DEFINED) =====
    customFields: [
      {
        fieldName: {
          type: String,
          required: true,
        },
        fieldValue: {
          type: String,
          default: "",
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    // ===== STYLING =====
    textColor: {
      type: String,
      default: "#000000",
      match: [/^#[0-9A-F]{6}$/i, "Please provide a valid hex color"],
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
      match: [/^#[0-9A-F]{6}$/i, "Please provide a valid hex color"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster lookups
cvSchema.index({ user_id: 1 });

export default mongoose.models.CV || mongoose.model("CV", cvSchema);
