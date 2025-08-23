import PassedExams from "../models/Congozi.passedexams.models";

export const getUserPassedExams = async (userId) => {
  try {
    const exams = await PassedExams.find({ paidBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user passed exams");
  }
};
export const getSingleUserPassedExams = async (userId, id) => {
  try {
    const exam = await PassedExams.findOne({
      _id: id,
      paidBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Passed exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the passed exam");
  }
};
