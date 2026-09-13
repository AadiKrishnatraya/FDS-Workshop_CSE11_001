import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.json());

const file = "./users.json";

app.get("/user", (req, res) => {
    try {
        const data = fs.readFileSync(file, "utf-8");
        const users = JSON.parse(data);

        res.json(users);

    } catch (err) {
        res.status(500).json({
            message: "Error reading file"
        });
    }
});


app.get("/user/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const data = fs.readFileSync(file, "utf-8");
        const users = JSON.parse(data);

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: "Error reading file"
        });
    }
});

app.post("/user", (req, res) => {
    try {
        const { name, email, age } = req.body;

        const data = fs.readFileSync(file, "utf-8");
        const users = JSON.parse(data);

        const newId =
            users.length > 0
                ? Math.max(...users.map((user) => user.id)) + 1
                : 1;

        const newUser = {
            id: newId,
            name: name,
            email: email,
            age: age
        };

        users.push(newUser);

        fs.writeFileSync(
            file,
            JSON.stringify(users, null, 4)
        );

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (err) {
        res.status(500).json({
            message: "Error writing file"
        });
    }
});

app.put("/user/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const { name, email, age } = req.body;

        const data = fs.readFileSync(file, "utf-8");
        const users = JSON.parse(data);

        const userIndex = users.findIndex(
            (user) => user.id === id
        );

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        users[userIndex] = {
            id: id,
            name: name,
            email: email,
            age: age
        };

        fs.writeFileSync(
            file,
            JSON.stringify(users, null, 4)
        );

        res.json({
            message: "User updated successfully",
            user: users[userIndex]
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating file"
        });
    }
});

app.delete("/user/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const data = fs.readFileSync(file, "utf-8");
        const users = JSON.parse(data);

        const userIndex = users.findIndex(
            (user) => user.id === id
        );

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const deletedUser = users.splice(userIndex, 1);

        fs.writeFileSync(
            file,
            JSON.stringify(users, null, 4)
        );

        res.json({
            message: "User deleted successfully",
            user: deletedUser[0]
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting user"
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
