import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();
connectDB();
let userData = [
    {
        id: null,
        name: "",
        email: "",
        age: null,
    }
];

const app = express();

app.use(cors()); 
app.use(express.json()); 

const port = 3000;

app.get("/msg", (req, res) => {
    res.json({ message: "Welcome to Express" });
});


app.get("/user", (req, res) => {
    res.json(userData);
});


app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    const user = userData.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        user
    });
});


app.post("/signup", (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required"
        });
    }

    const existingUser = userData.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email is already registered"
        });
    }

    const newId = userData.length > 0 
        ? Math.max(...userData.map((u) => u.id)) + 1 
        : 1;

    const newUser = { 
        id: newId, 
        name, 
        email: email.toLowerCase(), 
        password,
        age: age || null 
    };

    userData.push(newUser);

    return res.status(201).json({
        success: true,
        message: "Sign up successful!",
        user: newUser
    });
});


app.post("/user", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const newId = userData.length > 0 
        ? Math.max(...userData.map((u) => u.id)) + 1 
        : 1;

    const newUser = { id: newId, name, email, age: age || null };
    userData.push(newUser);

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    });
});


app.put("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, email, age } = req.body;

    const user = userData.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    });
});

// DELETE USER
app.delete("/user/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = userData.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const deletedUser = userData.splice(index, 1)[0];

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user: deletedUser
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});