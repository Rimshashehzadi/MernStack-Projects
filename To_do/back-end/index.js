import e  from "express";
import {connection ,collectionName} from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";


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

app.get("/tasks", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    if (result){
        resp.send({ message: "Tasks fetched successfully.", success: true, result});
    }else{
        resp.send({ message: "Failed to fetch tasks.", success: false });
    }
});
app.delete("/delete-task/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id;
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id)});
    if (result.deletedCount > 0) {
        resp.send({ message: "Task deleted successfully.", success: true });
    } else {
        resp.send({ message: "Failed to delete task.", success: false });
    }
});
    

app.listen(3200)