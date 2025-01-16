import { InterView } from "../database/schema.js";

export const interviewExp = async (req, res) => {
  const { name, country, company, questions, position, experience, previousSal } = req.body;


  try {
    if (!name || !country || !company || !questions || !experience || !previousSal) {
      return res.status(400).json({ msg: "Please fill all required fields." });
    }
 
    if (!Array.isArray(questions)) {
      return res.status(400).json({ msg: "Questions must be an array." });
    }

    if (questions.length > 3) {
      return res.status(400).json({ msg: "Sorry, a maximum of 3 questions is allowed." });
    }


    // Upsert document in MongoDB
    const updatedDocument = await InterView.findOneAndUpdate(
      { name},
      {
        $set: {
          name,
          country,
          company,
          questions,
          experience,
          previousSal,
          position,
        },
      },
      { upsert: true, new: true }
    );

    // Return successful response
    res.status(200).json({
      status: "success",
      data: {
        userId:updatedDocument.userId,
        name: updatedDocument.name,
        country: updatedDocument.country,
        company: updatedDocument.company,
        questions: updatedDocument.questions,
        experience: updatedDocument.experience,
        previousSal: updatedDocument.previousSal,
        position: updatedDocument.position,
      },
    });
  } catch (error) {

    res.status(500).json({
      status: "error",
      msg: "Error updating interview experience.",
      error: error.message,
    });
  }
};
