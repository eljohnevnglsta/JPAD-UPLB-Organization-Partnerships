import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
}

// reportedOrg: ObjectId (refers to Organizations)
// reporter: ObjectId (refers to Users)
// reason: Enum ("Non-compliance", "Misconduct", “Unprofessional”, Others)
// description: String
// image: String URL
// status: Enum ("pending", "resolved")

export const Report = mongoose.model('Report', {
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    reportedOrg: {
        type: String,
        required: true
    },
    reporter: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ["Non-compliance", "Misconduct", "Unprofessional", "Others"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    }, 
    response: {
        type: String,
        default: ""
    },
    dateReported: {
        type: Date,
        default: ""
    }
});

export const createReport = async (req, res) => {
    const { reportedOrg, reporter, reason, description, image } = req.body;
    const reportId = new mongoose.Types.ObjectId().toHexString();
    try {
        await Report.create({
            reportId,
            reportedOrg,
            reporter,
            reason,
            description,
            image,
            DateReported: new Date()
        });
        res.status(200).send({ success: true, message: "Report created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getReportById = async (req, res) => {
    const { reportId } = req.body;
    try {
        const report = await Report.findOne({ reportId });
        res.status(200).send(report);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Get all reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getReportsByOrg = async (req, res) => {
    const { reportedOrg } = req.body;
    try {
        const reports = await Report.find({ reportedOrg });
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getReportsByReporter = async (req, res) => {
    const { reporter } = req.body;
    try {
        const reports = await Report.find({ reporter });
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const updateReport = async (req, res) => {
    const { reportId, status, response } = req.body;
    try {
        const report = await Report.findOne({ reportId });
        if (!report) return res.status(404).send({ message: "Report not found" });

        report.status = status;
        report.response = response;
        await report.save();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}