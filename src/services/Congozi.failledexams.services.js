import FailledExams from "../models/Congozi.failedexams.models";

export const getUserFailledExams = async (userId) => {
  try {
    const exams = await FailledExams.find({ paidBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user failled exams");
  }
};

export const getSingleUserFailledExams = async (userId, id) => {
  try {
    const exam = await FailledExams.findOne({
      _id: id,
      paidBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Failled exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the failled exam");
  }
};
