
import express from "express";
let userData = [
    {
        id: 1,
        name: "aadi",
        age: 19
    }
];

const app = express();

app.use(express.json());

const port = 3000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
//using get
app.get("/msg",(req,res)=>{
    res.end("Welcome to the express");

});
app.get("/user",(req,res)=>{
    res.end(JSON.stringify(userData));
});
// app.get("/user/:id",(req,res)=>{
    
//     const id=1;
//     const f=userData.find(id);
//     res.end(JSON.stringify(f));
// });
//using post
// app.post("/create",(req,res)=>{
//     try{
//     let {id,name,age}=req.body;
    
//     let data={
//         id,
//         name,
//         age
//     };
//     userData.push(data);
//     res.end("Data added");
// }
// catch(err){
//     console.log(err);
//     res.end(err);
// }
// });

app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required",
        });
    }

    const newId =
        userData.length > 0
            ? Math.max(...userData.map((user) => user.id)) + 1
            : 101;

    const newUser = {
        id: newId,
        name: name,
        email: email,
    };

    userData.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID",
        });
    }

    const user = userData.find((user) => user.id === id);
   
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });

    }
});

// PUT - Edit user
app.put("/user/:id", (req, res) => {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    const user = userData.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: user
    });
});

//using put
//using delete