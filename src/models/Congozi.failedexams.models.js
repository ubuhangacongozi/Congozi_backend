import mongoose from "mongoose";
const failledExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});
const FailledExams =
  mongoose.model.failledExams ||
  mongoose.model("failledExams", failledExamsSchema);
export default FailledExams;
