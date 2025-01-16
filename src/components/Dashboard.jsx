import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get(
          "http://localhost:3001/api-job/get/submissions",
          {
            headers: {
              Authorization: localStorage.getItem('id'),
            },
          }
        );

        setSubmissions(Array.isArray(response.data)? response.data : [response.data]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p>Error loading submissions: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Submissions Dashboard
        </h1>
        <div className="grid gap-6">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6"
            >
              <header className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {submission.position} at {submission.company}
                </h2>
                <p className="text-sm text-gray-500">
                  Location: {submission.country}
                </p>
              </header>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Questions
                  </h3>
                  <ul className="space-y-2">
                    {submission.questions.map((question, qIndex) => (
                      <li
                        key={qIndex}
                        className="bg-gray-100 p-3 text-black rounded-md hover:bg-gray-200 transition"
                      >
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">Experience Required</dt>
                      <dd className="font-medium text-gray-900">
                        {submission.experience} years
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Previous Salary</dt>
                      <dd className="font-medium text-gray-900">
                        ${Number(submission.previousSal).toLocaleString()} LPA
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
