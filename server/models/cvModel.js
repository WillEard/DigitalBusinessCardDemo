import mongoose from "mongoose";

// CV/Resume Schema
const cvSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String, default: "Your CV Title" },
  education: { type: String, default: "Add your education details here" },
  experience: { type: String, default: "Add your work experience here" },
  skills: { type: String, default: "Add your skills here" },
  certifications: { type: String, default: "Add your certifications here" },
  projects: { type: String, default: "Add your projects here" },
  languages: { type: String, default: "Add your languages here" },
  hobbies: { type: String, default: "Add your hobbies here" },
  achievements: { type: String, default: "Add your achievements here" },
  textColor: { type: String, default: "#000000", required: true },
  backgroundColor: { type: String, default: "#ffffff", required: true },
  profilePicture: { type: String, default: "" },
});

const CV = mongoose.models.CV || mongoose.model("CV", cvSchema);
export default CV;
