import WaittingExams from "../models/Congozi.waittingexams.models";
export const getUserWaittingExams = async (userId) => {
  try {
    const exams = await WaittingExams.find({ paidBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user waitting exams");
  }
};
export const getSingleUserWaittingExam = async (userId, id) => {
  try {
    const exam = await WaittingExams.findOne({
      _id: id,
      paidBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Waitting exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the waitting exam");
  }
};
