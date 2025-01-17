import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: '../.env' });

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
}

export const Announcement = mongoose.model('Announcement', {
    announcementId: {
        type: String,
        required: true,
        unique: true
    },
    publisher: {
        type: String, // Email of the organization
        required: true
    },
    announcementDate: {
        type: Date,
        default: Date.now
    },    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        default: ""
    }
});

export const createAnnouncement = async (req, res) => {
    const { publisher, title, description, eventId, cover } = req.body;
    const announcementId = new mongoose.Types.ObjectId().toHexString();
    try {
        await Announcement.create({
            announcementId,
            publisher,
            title,
            description,
            eventId,
            cover
        });
        res.status(200).send({ success: true, message: "Announcement created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getAnnouncementById = async (req, res) => {
    const { announcementId } = req.body;
    try {
        const announcement = await Announcement.findOne({ announcementId });
        res.status(200).send(announcement);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Get all announcements (also for pagination)
export const getAllAnnouncements = async (req, res) => {
    const { page = 1, limit = 5 } = req.query; // set default page to 1 and limit to 5
    try {
        const announcements = await Announcement.find()
            .skip((page - 1) * limit)  // limit and skip number of pages
            .limit(Number(limit)); 

        const totalCount = await Announcement.countDocuments(); // get total number of announcements

        res.status(200).json({
            announcements,
            totalPages: Math.ceil(totalCount / limit), 
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


export const getAnnouncementsByOrg = async (req, res) => {
    const { publisher } = req.body;
    try {
        const announcements = await Announcement.find({ publisher });
        res.status(200).send(announcements);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const updateAnnouncement = async (req, res) => {
    const { announcementId, title, description, cover } = req.body;
    try {
        const announcement = await Announcement.findOne({ announcementId });
        if (!announcement) return res.status(404).send({ message: "Announcement not found" });

        if (title) announcement.title = title;
        if (description) announcement.description = description;
        if (cover) announcement.cover = cover;

        await announcement.save();
        res.status(200).send({ success: true, message: "Announcement updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteAnnouncement = async (req, res) => {
    const { announcementId } = req.body;
    try {
        await Announcement.deleteOne({ announcementId });
        res.status(200).send({ success: true, message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const createAnnouncementJson = {
    publisher: "examplepublisher",
    title: "Example Title",
    description: "Example Description",
    eventId: "exampleEventId",
    cover: "exampleCoverUrl"
};