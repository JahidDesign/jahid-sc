// src/components/EducationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/education";

const EducationDetails = () => {
  const { id } = useParams();
  const [edu, setEdu] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => setEdu(res.data));
  }, [id]);

  if (!edu) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <img
        src={edu.image}
        alt={edu.title}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-bold">{edu.title}</h2>
      <p className="text-gray-500">{edu.year}</p>
      <p className="text-gray-700 mt-3">{edu.description}</p>
      <span className="inline-block mt-4 text-xs px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
        {edu.tag}
      </span>
      <div className="mt-6 flex justify-between">
        <Link
          to="/education"
          className="text-gray-600 hover:underline text-sm"
        >
          ⬅ Back
        </Link>
        <a
          href={edu.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Visit Site
        </a>
      </div>
    </div>
  );
};

export default EducationDetails;
