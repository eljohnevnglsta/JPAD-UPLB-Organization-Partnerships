import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
}

// Event Collection
    // publisher: ObjectId (refers to Accounts)
    // partnerIds: Array of ObjectIds (refers to Accounts)
    // title: String
    // description: String
    // startDate: Date()
    // endDate: Date()
    // otherDetails: String
    // cover: String (URL)
    // eventType: Fund-raising, Flagship, Community, Contest etc.
    // isActive: Boolean

export const Event = mongoose.model('Event', {
    eventId: {
        type: String,
        required: true,
        unique: true
    },
    publisher: {
        type: String, // Email of the publisher
        required: true
    },
    partnerIds: {
        type: [String], // Email of the partners
        default: []
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    otherDetails: {
        type: String,
        default: ""
    },
    cover: {
        type: String,
        default: ""
    },
    eventType: {
        type: String,
        enum: ["Fund-raising", "Flagship", "Community", "Contest", "Education", "Health", "Environment", "Technology", "Others"],
        default: "Others"
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const { publisher, title, description, startDate, endDate, otherDetails, cover, eventType } = req.body;
        const eventId = new mongoose.Types.ObjectId().toHexString();
        const newEvent = new Event({ eventId, publisher, title, description, startDate, endDate, otherDetails, cover, eventType });
        await newEvent.save();
        res.status(201).json({success: true, message: "Event created successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get all events by a publisher
export const getEventsByPublisher = async (req, res) => {
    try {
        const { publisher } = req.body;
        const events = await Event.find({ publisher });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an event by eventId
export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.findOne({ eventId });
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an event
// requirment {eventId, <attribute to update>}
export const updateEvent = async (req, res) => {
    try {
        const { eventId, title, partnerIds, description, startDate, endDate, otherDetails, cover, eventType, isActive } = req.body;
        const event = await Event.findOne({ eventId });
        if (!event) return res.status(404).json({ message: "Event not found" });

        event.title = title || event.title;
        event.partnerIds = partnerIds || event.partnerIds;
        event.description = description || event.description;
        event.startDate = startDate || event.startDate;
        event.endDate = endDate || event.endDate;
        event.otherDetails = otherDetails || event.otherDetails;
        event.cover = cover || event.cover;
        event.eventType = eventType || event.eventType;
        event.isActive = isActive || event.isActive;

        await event.save();
        res.status(200).json({success: true, message: "Event updated successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event (Set isActive to false)
export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.find({ eventId });
        if (!event) return res.status(404).json({ message: "Event not found" });
        event.isActive = false;
        await event.save();
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}