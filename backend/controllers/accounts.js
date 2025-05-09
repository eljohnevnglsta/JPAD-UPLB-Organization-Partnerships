import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config({ path: '../.env' });

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
}

export const Account = mongoose.model('Account', {
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["organization", "individual", "admin"],
        default: "organization"
    },
    status: {
        type: String,
        enum: ["active", "banned"],
        default: "active"
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: "https://w7.pngwing.com/pngs/407/757/png-transparent-round-white-and-black-sprocket-logo-wheel-circle-symbol-font-application-default-simple-share-icon-symbol-thumbnail.png"
    },
    contactDetails: {
        type: Object,
        default: {
            Facebook: "",
            Instagram: "",
            X: "",
            Number: "",
            OtherLinks: []
        }
    },
    requirements: {
        type: Array,
        default: []
    }
});

// Register a new account
export const registerAccount = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if email already exists
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) return res.json({ success: false, message: "Email already taken" });

        // Check if name already exists
        if (role === "organization") {
            const existingName = await Account.findOne({ name });
            if (existingName) return res.json({ success: false, message: "Organization name already taken" });
        }

        // Hash password before saving
        let hashed = await bcrypt.hash(password, 10);
        const account = new Account({ name, email, password: hashed, role });
        await account.save();
        
        return res.json({ success: true, message: "Account registered successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Login an account
export const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await Account.findOne({ email });
        if (!account) return res.status(404).json({ success: false, message: "Account not found" });
        
        let match = await bcrypt.compare(password, account.password);
        if (!match) return res.json({ success: false, message: "Invalid credentials" });

        // Generate token for authentication
        const token = jwt.sign({ email: account.email, role: account.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { 
            maxAge: 15 * 24 * 60 * 60 * 1000, //ms format
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        return res.json({ success: true, message: "Login successful" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Logout an account
export const logoutAccount = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Get account details via email or object id
export const getAccount = async (req, res) => {
    try {
        const email = req.body.email;
        const account = await Account.findOne({ email });
        return res.json(account);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Get all accounts
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        return res.json(accounts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Update account details
export const updateAccount = async (req, res) => {
    try {
        const email = req.body.email;
        let account = await Account.findOne({ email });
        if (!account) return res.status(404).json({ message: "Account not found" });

        if (req.body.name) account.name = req.body.name;
        if (req.body.password) {
            let hashed = await bcrypt.hash(req.body.password, 10);
            account.password = hashed;
        }
        if (req.body.status) account.status = req.body.status;
        if (req.body.bio) account.bio = req.body.bio;
        if (req.body.profilePicture) account.profilePicture = req.body.profilePicture;
        if (req.body.contactDetails) account.contactDetails = req.body.contactDetails;
        if (req.body.requirements) account.requirements = req.body.requirements;
        
        await account.save();
        return res.json({ updated: true, message: "Account updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}