import e from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from "cookie-parser";

const app = e();

app.use(e.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use(cookieParser());


app.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return resp.status(400).send({
      success: false,
      msg: "Email and Password are required",
    });
  }

  const db = await connection();
  const collection = db.collection("users");

  // Check if email exists
  const user = await collection.findOne({ email });

  if (!user) {
    return resp.status(404).send({
      success: false,
      msg: "Wrong Email",
    });
  }

  // Check password
  if (user.password !== password) {
    return resp.status(401).send({
      success: false,
      msg: "Wrong Password",
    });
  }

  // Generate JWT
  jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "Google",
    { expiresIn: "5d" },
    (err, token) => {
      if (err) {
        return resp.status(500).send({
          success: false,
          msg: "Token generation failed",
        });
      }

      resp.send({
        success: true,
        msg: "Login Successful",
        token,
      });
    }
  );
});

app.post('/signup', async (req, resp) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.insertOne(userData);
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                resp.send({
                    success: true,
                    msg: 'signup done',
                    token
                })
                console.log(userData)
            })
        }

    } else {
        resp.send({
            success: false,
            msg: 'signup not done'
        })
    }
    // resp.send('Api in progress')
})



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

app.get("/tasks", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    console.log('cookies test',req.cookies['token']);
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    if (result) {
        resp.send({ message: "Tasks fetched successfully.", success: true, result });
    } else {
        resp.send({ message: "Failed to fetch tasks.", success: false });
    }
});


app.get("/task/:id",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const id = req.params.id;
    const result = await collection.findOne({ _id: new ObjectId(id) })
    if (result) {
        resp.send({ message: "Tasks fetched successfully.", success: true, result });
    } else {
        resp.send({ message: "Failed  try after sometime.", success: false });
    }
});
app.delete("/delete-task/:id",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const id = req.params.id;
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
        resp.send({ message: "Task deleted successfully.", success: true });
    } else {
        resp.send({ message: "Failed to delete task.", success: false });
    }
});

app.put('/update-task',verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);

    const { _id, ...fields } = req.body;
    const update = { $set: fields };

    // console.log(fields);

    const results = await collection.updateOne(
        { _id: new ObjectId(_id) },
        update
    );

    if (results.modifiedCount > 0) {
        return resp.send({
            message: "Task updated successfully",
            success: true,
            results,
        });
    } else {
        return resp.send({
            message: "No task updated",
            success: false,
        });
    }
});

function verifyJWTToken (req,resp,next){
    const token = req.cookies['token'];
    jwt.verify(token,'Google',(error,decode) => {
        if(error){
            return resp.send({
                message:'Invalid Token',
                success:true
            })
        }
        next()

    })

}


app.listen(3200) 