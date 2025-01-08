import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
}

export const Request = mongoose.model('Request', {
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    publisher: {
        type: String, // Email of the publisher
        required: true
    },
    invitee: {
        type: String, // Email of the invitee 
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed", "cancelled"],
        default: "pending"
    },
    partnershipType: {
        type: String, // Ex. Looking for sponsors, media partners, manpower and etc.
        required: true
    },
    attachments: {
        type: [String], // URL of the attachments (downloadable)
        default: []
    }, message: {
        type: String,
        required: true,
        default: ""
    },
    response: {
        type: String,
        default: ""
    }
});

export const createRequest = async (req, res) => {
    const { publisher, invitee, eventId, partnershipType, attachments } = req.body;
    const requestId = new mongoose.Types.ObjectId().toHexString();
    try {
        await Request.create({
            requestId,
            publisher,
            invitee,
            eventId,
            partnershipType,
            attachments 
        });
        res.status(200).json({ message: "Request created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRequestsByInvitee = async (req, res) => {
    const { publisher } = req.body;
    try {
        const requests = await Request.find({ invitee });
        res.status(200).json({ message: "Requests found", value: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRequestsByPublisher = async (req, res) => {
    const { publisher } = req.body;
    try {
        const requests = await Request.find({ publisher });
        res.status(200).json({ message: "Requests found", value: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRequestById = async (req, res) => {
    const { requestId } = req.body;
    try {
        const request = await Request.findOne({requestId});
        if (!request) return res.status(404).json({ message: "Request not found" });
        res.status(200).json({ message: "Request found", value: request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json({ message: "Requests found", value: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

export const updateRequest = async (req, res) => {
    const { requestId, status, response } = req.body;
    try {
        const request = await Request.findOne({ requestId });
        if (!request) return res.status(404).json({ message: "Request not found" });
        await Request.updateOne({ requestId }, { status, response });
        res.status(200).json({ success: true, message: "Request updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}