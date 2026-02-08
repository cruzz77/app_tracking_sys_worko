import validator from "validator";
import Candidate from "../models/candidateModel.js";

const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (!validator.isMobilePhone(phone, "any")) {
      return res.status(400).json({ success: false, message: "Invalid Phone" });
    }

    const exists = await Candidate.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Candidate already exists" });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
      resume: req.file ? req.file.filename : null,
      referredBy: req.userId
    });

    res.status(201).json({ success: true, candidate });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getCandidates = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let query = {};

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } }
      ];
    }

    const candidates = await Candidate.find(query)
      .populate("referredBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Candidate.countDocuments(query);

    res.json({ success: true, total, candidates });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.json({ success: true, candidate });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Pending", "Reviewed", "Hired"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid Status" });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, candidate });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const pending = await Candidate.countDocuments({ status: "Pending" });
    const reviewed = await Candidate.countDocuments({ status: "Reviewed" });
    const hired = await Candidate.countDocuments({ status: "Hired" });

    res.json({ success: true, stats: { total, pending, reviewed, hired } });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateStatus,
  deleteCandidate,
  getStats
};
