import mongoose from "mongoose";
const expiredAccountsSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});
const ExpiredAccounts =
  mongoose.model.expiredAccounts ||
  mongoose.model("expiredAccounts", expiredAccountsSchema);
export default ExpiredAccounts;
