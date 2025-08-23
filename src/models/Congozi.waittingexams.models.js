import mongoose from "mongoose";
const waitingExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  accessCode: { type: String },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});
const WaittingExams =
  mongoose.model.waittingExams ||
  mongoose.model("waittingExams", waitingExamsSchema);
export default WaittingExams;
