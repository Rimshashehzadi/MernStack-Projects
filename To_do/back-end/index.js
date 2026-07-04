import e  from "express";
import {connection ,collectionName} from "./dbconfig.js";

const app = e();

app.use(e.json());

// app.post("/add-task", async(req, resp) => {
//     const db = await connection();
//     const collection = db.collection(collectionName);
//     const result = await collection.insertOne(req.body);
//     resp.send('Working...')
// })

   
//     app.get("/add-task", (req, res) => {
//     res.send("This is the add-task route. Use POST to insert data.");
// });

// app.get("/", (req, resp) => {
//     resp.send({
//         message: "Hello World",
//         success: true,
//     })
// })
app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    resp.send("Working...");
});

app.get("/", (req, resp) => {
    resp.send({
        message: "Hello World",
        success: true,
    });
});
app.listen(3200)