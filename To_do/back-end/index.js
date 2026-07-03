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
app.post("/add-task", async (req, resp) => {
    console.log(req.body);

    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(req.body);

    console.log(result);

    resp.send("Working...");
});

app.get("/", (req, resp) => {
    resp.send({
        message: "Hello World",
        success: true,
    })
})
app.listen(3200)