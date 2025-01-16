import { InterView } from "../database/schema.js";

export const getAllInterviews = async (req, res) => {
    try {
        const interviewItems = await InterView.find();
        
        if (!interviewItems || interviewItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No interview items found"
            });
        }

        const info = interviewItems.map((item) => ({
            name: item.name,
            company: item.company,
            country: item.country,
            questions: item.questions
        }));

        return res.status(200).json({
            success: true,
            submissions: info
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching interview items",
            error: error.message
        });
    }
};