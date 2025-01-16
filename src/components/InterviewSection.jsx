import React, { useState, useEffect } from 'react';
import { FactoryIcon, User2Icon, FileQuestionIcon, MapIcon } from 'lucide-react';
import axios from 'axios';

const InterviewSection = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api-job/get/getAllInterview",{
          headers:{
            'Authorization':localStorage.getItem('token')
          }
        });
        if (response.data.success) {
          setInterviewData(response.data.submissions);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch interview data");
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500 font-semibold text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 font-sans tracking-tight">
        All Experienced Interview Questions With Experts
      </h1>

      {interviewData.length === 0 ? (
        <div className="text-center text-gray-600 text-xl font-semibold">
          Sorry, no interview experiences available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {interviewData.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl  shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 "
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <User2Icon className="w-5 h-5 text-blue-600" />
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FactoryIcon className="w-5 h-5 text-purple-600" />
                    <p className="text-gray-700 font-medium">{item.company}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapIcon className="w-5 h-5 text-green-600" />
                    <p className="text-gray-700">{item.country}</p>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50 group">
                    <FileQuestionIcon className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                    <div className="text-blue-600 cursor-pointer font-medium group-hover:text-blue-700">
                     <a href="/dashboard">{item.questions}</a>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewSection;