import WaittingAccounts from "../models/Congozi.waittingaccounts.models";

export const getUserWaittingAccounts = async (userId) => {
  try {
    const accounts = await WaittingAccounts.find({ paidBy: userId })
      .populate({
        path: "account",
      })
      .sort({ createdAt: -1 });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user waitting accounts");
  }
};
export const getSingleUserWaittingAccounts = async (userId, id) => {
  try {
    const account = await WaittingAccounts.findOne({
      _id: id,
      paidBy: userId,
    }).populate({
      path: "account",
    });

    if (!account) {
      throw new Error("Waitting account not found or unauthorized access");
    }

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the waitting account");
  }
};
