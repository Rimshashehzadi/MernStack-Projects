import e from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

 dotenv.config();

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

// import express from "express";
// import { connection, collectionName } from "./dbconfig.js";
// import cors from "cors";
// import { ObjectId } from "mongodb";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";


// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://your-frontend-domain.vercel.app", // Replace with your frontend URL
//     ],
//     credentials: true,
//   })
// );

// app.use(cookieParser());

// /* ===========================
//    JWT Middleware
// =========================== */

// function verifyJWTToken(req, resp, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return resp.status(401).send({
//       success: false,
//       message: "Token Missing",
//     });
//   }

//   jwt.verify(token, "Google", (err, decoded) => {
//     if (err) {
//       return resp.status(401).send({
//         success: false,
//         message: "Invalid Token",
//       });
//     }

//     req.user = decoded;
//     next();
//   });
// }

// /* ===========================
//    LOGIN API
// =========================== */
// app.post("/login", async (req, resp) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return resp.status(400).send({
//       success: false,
//       msg: "Email and Password are required",
//     });
//   }

//   const db = await connection();
//   const collection = db.collection("users");

//   // Check if email exists
//   const user = await collection.findOne({ email });

//   if (!user) {
//     return resp.status(404).send({
//       success: false,
//       msg: "Wrong Email",
//     });
//   }

//   // Check password
//   if (user.password !== password) {
//     return resp.status(401).send({
//       success: false,
//       msg: "Wrong Password",
//     });
//   }

//   // Generate JWT
//   jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//     },
//     "Google",
//     { expiresIn: "5d" },
//     (err, token) => {
//       if (err) {
//         return resp.status(500).send({
//           success: false,
//           msg: "Token generation failed",
//         });
//       }

//       resp.send({
//         success: true,
//         msg: "Login Successful",
//         token,
//       });
//     }
//   );
// });

// // app.post("/login", async (req, resp) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Check empty fields
// //     if (!email || !password) {
// //       return resp.status(400).json({
// //         success: false,
// //         msg: "Email and Password are required",
// //       });
// //     }

// //     // Connect Database
// //     const db = await connection();

// //     if (!db) {
// //       return resp.status(500).json({
// //         success: false,
// //         msg: "Database Connection Failed",
// //       });
// //     }

// //     const collection = db.collection("users");

// //     // Find User
// //     const user = await collection.findOne({ email: email });

// //     console.log("User:", user);

// //     // Email not found
// //     if (!user) {
// //       return resp.status(404).json({
// //         success: false,
// //         msg: "Wrong Email",
// //       });
// //     }

// //     // Password incorrect
// //     if (user.password !== password) {
// //       return resp.status(401).json({
// //         success: false,
// //         msg: "Wrong Password",
// //       });
// //     }

// //     // Create Token
// //     const token = jwt.sign(
// //       {
// //         id: user._id,
// //         email: user.email,
// //       },
// //       process.env.JWT_SECRET || "Google",
// //       {
// //         expiresIn: "5d",
// //       }
// //     );

// //     // Save Cookie
// //     resp.cookie("token", token, {
// //       httpOnly: true,
// //       secure: false,
// //       sameSite: "lax",
// //       maxAge: 5 * 24 * 60 * 60 * 1000,
// //     });

// //     return resp.status(200).json({
// //       success: true,
// //       msg: "Login Successful",
// //       token,
// //     });

// //   } catch (error) {
// //     console.error("LOGIN ERROR:", error);

// //     return resp.status(500).json({
// //       success: false,
// //       msg: error.message,
// //     });
// //   }
// // });
// /* ===========================
//    SIGNUP
// =========================== */

// app.post("/signup", async (req, resp) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return resp.status(400).send({
//         success: false,
//         msg: "Please fill all fields",
//       });
//     }

//     const db = await connection();
//     const collection = db.collection("users");

//     const existingUser = await collection.findOne({ email });

//     if (existingUser) {
//       return resp.send({
//         success: false,
//         msg: "Email already exists",
//       });
//     }

//     const result = await collection.insertOne({
//       name,
//       email,
//       password,
//     });

//     jwt.sign(
//       {
//         id: result.insertedId,
//         email,
//       },
//       "Google",
//       { expiresIn: "5d" },
//       (err, token) => {
//         if (err) {
//           return resp.status(500).send({
//             success: false,
//             msg: "Token Generation Failed",
//           });
//         }

//         resp.cookie("token", token, {
//           httpOnly: true,
//           secure: false,
//           sameSite: "lax",
//           maxAge: 5 * 24 * 60 * 60 * 1000,
//         });

//         resp.send({
//           success: true,
//           msg: "Signup Successful",
//           token,
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       msg: "Server Error",
//     });
//   }
// });
// /* ===========================
//    ADD TASK
// =========================== */

// app.post("/add-task", verifyJWTToken, async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);

//     const result = await collection.insertOne(req.body);

//     if (result.insertedId) {
//       return resp.send({
//         success: true,
//         message: "Task added successfully.",
//         result,
//       });
//     }

//     resp.send({
//       success: false,
//       message: "Failed to add task.",
//     });
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// /* ===========================
//    GET ALL TASKS
// =========================== */

// app.get("/tasks", verifyJWTToken, async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);

//     const result = await collection.find().toArray();

//     resp.send({
//       success: true,
//       message: "Tasks fetched successfully.",
//       result,
//     });
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// /* ===========================
//    GET SINGLE TASK
// =========================== */

// app.get("/task/:id", verifyJWTToken, async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);

//     const result = await collection.findOne({
//       _id: new ObjectId(req.params.id),
//     });

//     if (!result) {
//       return resp.send({
//         success: false,
//         message: "Task not found",
//       });
//     }

//     resp.send({
//       success: true,
//       message: "Task fetched successfully.",
//       result,
//     });
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// /* ===========================
//    UPDATE TASK
// =========================== */

// app.put("/update-task", verifyJWTToken, async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);

//     const { _id, ...fields } = req.body;

//     const result = await collection.updateOne(
//       { _id: new ObjectId(_id) },
//       {
//         $set: fields,
//       }
//     );

//     if (result.modifiedCount > 0) {
//       return resp.send({
//         success: true,
//         message: "Task updated successfully",
//       });
//     }

//     if (result.matchedCount > 0) {
//       return resp.send({
//         success: true,
//         message: "No changes were made",
//       });
//     }

//     resp.send({
//       success: false,
//       message: "Task not found",
//     });
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// /* ===========================
//    DELETE TASK
// =========================== */

// app.delete("/delete-task/:id", verifyJWTToken, async (req, resp) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(collectionName);

//     const result = await collection.deleteOne({
//       _id: new ObjectId(req.params.id),
//     });

//     if (result.deletedCount > 0) {
//       return resp.send({
//         success: true,
//         message: "Task deleted successfully.",
//       });
//     }

//     resp.send({
//       success: false,
//       message: "Task not found.",
//     });
//   } catch (error) {
//     console.log(error);

//     resp.status(500).send({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// /* ===========================
//    SERVER
// =========================== */

// const PORT = process.env.PORT || 3200;

// console.log("Before app.listen");

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });