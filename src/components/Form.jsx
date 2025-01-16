import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    country: 'India',
    company: '',
    experience: '',
    position: '',
    salary: '',
    questions: ['', '', ''],
  });
  const countries = [
    'USA',
    'Canada',
    'India',
    'UK',
    'China',
    'Russia',
    'Germany',
    'Italy',
    'Spain',
    'Poland',
    'Argentina',
  ];

  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...data.questions];
    newQuestions[index] = value;
    setData({ ...data, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:3001/api-job/post/interview',
        {
          name: data.name,
          country: data.country,
          company: data.company,
          experience: data.experience,
          position: data.position,
          previousSal: data.salary,
          questions: data.questions,
        },
        {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        }
      ).then((response)=>{
        localStorage.setItem('id',response.data.data.userId)
      }
      )

      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name..."
            value={data.name}
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />

          <select
            name="country"
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            required
          >
            <option disabled>Select your country</option>
            {countries.map((item, idx) => (
              <option value={item} key={idx}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Company..."
            value={data.company}
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setData({ ...data, company: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Position..."
            value={data.position}
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setData({ ...data, position: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Experience..."
            value={data.experience}
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setData({ ...data, experience: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Previous Salary..."
            value={data.salary}
            className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            required
          />

          {data.questions.map((question, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Question ${idx + 1}`}
              value={question}
              className="w-full px-4 py-2 border text-sm lg:text-lg text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              required
            />
          ))}

          {loading && (
            <div className="text-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500"></div>
              <p className="text-sm text-gray-500 mt-2">Submitting...</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200"
            disabled={loading} 
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormData;
