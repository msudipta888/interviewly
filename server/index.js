import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { register, interview, signin, signout, getAllInterviewInfo, submissionsRoute } from './routes/route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const Server = new createServer(app);

app.use(cors({
  methods: "*",
}));
app.use(express.json());



// Routes
app.use("/api/user", register);
app.use("/api/user", signin);
app.use("/api/user", signout);

app.use("/api-job/post", interview);

app.use("/api-job/get", getAllInterviewInfo);
app.use('/api-job/get',submissionsRoute)
// Start server
const startServer = async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

  Server.listen(3001, () => {
    console.log('Server is listening on port 3001');
  });
};

startServer();
