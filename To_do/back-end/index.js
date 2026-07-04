import e  from "express";
import {connection ,collectionName} from "./dbconfig.js";
import cors from 'cors';


const app = e();

app.use(e.json());
app.use(cors());



app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        resp.send({ message: "Task added successfully.", success: true, result });
    } else {
        resp.send({ message: "Failed to add task.", success: false });
    }
});

app.listen(3200)