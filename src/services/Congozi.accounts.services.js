import Accounts from "../models/Congozi.accounts.models";
import payments from "../models/Congozi.payments.models";
import ExpiredAccounts from "../models/Congozi.expiredaccounts.models";
import TotalUserAccounts from "../models/Congozi.totaluseraccounts.models";
import UnpaidAccounts from "../models/Congozi.unpaidaccounts.models";
import WaittingAccounts from "../models/Congozi.waittingaccounts.models";

export const createAccount = async (accountData) => {
  const { title, validIn, fees, grantedexams } = accountData;

  try {
    const existingAccount = await Accounts.findOne({ title });
    if (existingAccount) {
      throw new Error("This account already exists");
    }
    const account = await Accounts.create({
      title,
      fees,
      validIn,
      grantedexams,
    });

    return {
      message: "Account recorded",
      Account: account,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating account: ${error.message}`);
  }
};
export const updateAccount = async (id, accountData) => {
  const { title } = accountData;

  try {
    const accountExist = await Accounts.findById(id);
    if (!accountExist) {
      throw new Error("Account not found");
    }
    if (title) {
      const duplicate = await Accounts.findOne({
        title,
        _id: { $ne: id },
      });

      if (duplicate) {
        throw new Error("An account type exist");
      }
    }
    const updatedAccount = await Accounts.findByIdAndUpdate(id, accountData, {
      new: true,
    });

    return updatedAccount;
  } catch (error) {
    throw new Error(`Error updating account: ${error.message}`);
  }
};
export const deleteAccount = async (id) => {
  try {
    const isExist = await Accounts.findById(id);
    if (!isExist) {
      throw new Error("Account not found");
    }
    await payments.deleteMany({
      itemId: id,
      itemType: "exams",
    });

    await WaittingAccounts.deleteMany({
      account: id,
    });
    await UnpaidAccounts.deleteMany({
      account: id,
    });
    await TotalUserAccounts.deleteMany({
      account: id,
    });
    await ExpiredAccounts.deleteMany({
      account: id,
    });
    await Accounts.findByIdAndDelete(id);
    return {
      message: "Account deleted",
      deletedAccount: isExist,
    };
  } catch (error) {
    throw new Error(`Error deleting account: ${error.message}`);
  }
};
export const getAllAccount = async () => {
  try {
    const allAccounts = await Accounts.find();
    return allAccounts;
  } catch (error) {
    throw new Error(`Error retrieving account: ${error.message}`);
  }
};
export const getAccountById = async (id) => {
  try {
    const isExist = await Accounts.findById(id);
    if (!isExist) {
      throw new Error("Account not found");
    }
    return isExist;
  } catch (error) {
    throw new Error(`Error retrieving account: ${error.message}`);
  }
};
