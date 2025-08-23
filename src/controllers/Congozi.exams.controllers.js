import * as examsService from "../services/Congozi.exams.services";
import {
  validateCreateExam,
  validateUpdateExam,
} from "../validation/Congozi.exams.validation";
import Exams from "../models/Congozi.exams.models";
import UnpaidExams from "../models/Congozi.unpaidexams.models";
export const getExamNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const userId = req.loggedInUser.id;

    // Find the exam
    const exam = await Exams.findOne({
      number: number,
      type: "gukora" 
    }).populate({
      path: "questions",
      populate: {
        path: "options",
        model: "options"
      }
    });

    if (!exam) {
      return res.status(404).json({
        status: "404",
        message: "Exam not found",
      });
    }

    // Check for unpaid exam
    const unpaidExam = await UnpaidExams.findOne({
      exam: exam._id,
      paidBy: userId,
      status: "pending"
    });

    if (unpaidExam) {
      return res.status(400).json({
        status: "400",
        message: "Ikikizamini waragisabye ariko ntikishyuwe. Banza ukishyure!!!",
      });
    }

    return res.status(200).json({
      status: "200",
      message: `Ikizamin ${number} cyaje neza!!`,
      data: exam,
    });
  } catch (error) {
    console.error("Error in getExamNumber:", error);
    return res.status(500).json({
      status: "500",
      message: "habayemo ikibazo",
      error: error.message,
    });
  }
};
// create exam controller
export const createExamination = async (req, res) => {
  const { error, value } = validateCreateExam(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const exam = await examsService.createExam(value);
    return res.status(201).json({
      status: "201",
      message: "Exam created",
      data: exam,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updateExam = async (req, res) => {
  const { error, value } = validateUpdateExam(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedExam = await examsService.updateExams(id, value);

    return res.status(200).json({
      message: "Exam updated",
      data: updatedExam,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await examsService.deleteExam(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await examsService.getAllExams();
    return res.status(200).json({
      status: "200",
      message: "Exam retrieved ",
      data: exams,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await examsService.getExamById(id);

    return res.status(200).json({
      status: "200",
      message: "Exam retrieved",
      data: exam,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
