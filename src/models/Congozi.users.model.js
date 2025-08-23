import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fName: { type: String },
  lName: { type: String },
  idCard: { type: String },
  address: { type: String },
  phone: { type: String },
  companyName: { type: String },
  tin: { type: String },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin", "supperAdmin", "school"],
    default: "student",
  },
  purchasedExams: [{ type: mongoose.Schema.ObjectId, ref: "exams" }],
  purchasedAccounts: [{ type: mongoose.Schema.ObjectId, ref: "accounts" }],
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.models.user || mongoose.model("user", userSchema);

export default Users;
