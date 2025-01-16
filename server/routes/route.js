import express from 'express'
import { interviewExp } from '../interview/interviewexp.js';
import { Login, Register, Signout } from '../authentication/userauth.js';
import { getAllInterviews } from '../interview/getAllinterview.js';
import { InterView } from '../database/schema.js';

 const route = express.Router();
const register=route.post("/register",Register)
const signin = route.post("/signin",Login)
const signout = route.delete("/signout",Signout)

const interview=route.post('/interview',interviewExp);
const getAllInterviewInfo= route.get('/getAllInterview',getAllInterviews);

const submissionsRoute = route.get('/submissions', async (req, res) => {
  const userId = req.headers['authorization']
  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' }); 
    }
    const submissions = await InterView.findOne({ userId :String(userId) });

    if (!submissions) {
      return res.status(404).json({ message: 'No submissions found for this user' });
    }
    
    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching submissions', details: error.message });
  }
});

  
export {register,interview,signin,signout,getAllInterviewInfo,submissionsRoute};