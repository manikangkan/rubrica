import axios from "axios";
import baseURL from "../../utils/baseURL";
import { useEffect, useState } from "react";

const AddStudent = ({ setAddStudent }) => {
  const [formData, setFormData] = useState({
    names: [],
    projectTitle: "",
    projectDescription: "",
    rollNumbers: [],
    guide: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [guides, setGuides] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.includes(",")
        ? e.target.value.split(",").map((item) => item.trim())
        : e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseURL}/api/students`, formData);
      setResponse(data.msg);
    } catch (error) {
      setResponse(error.response?.data.msg);
    }
  };

  useEffect(() => {
    const getGuides = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/guides`);
        setGuides(data);
      } catch (err) {
        console.log(err);
      }
    };
    getGuides();
  }, []);

  return (
    <div className="bg-white absolute right-0 top-0 bottom-0 h-full max-w-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4>Add new student details</h4>
        <button
          className="bg-transparent text-slate-800"
          onClick={() => setAddStudent(false)}>
          Close
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Developers name</label>
          <input
            type="text"
            placeholder="Eg. Manikangkan Das, Bidipta Saikia"
            name="names"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Project title</label>
          <input
            type="text"
            placeholder="Eg. Rubrica - 21st century rubric builder"
            name="projectTitle"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Project description</label>
          <textarea
            name="projectDescription"
            onChange={handleChange}
            required
            defaultValue={
              "Eg. A web app that allows users to create and share their own stories"
            }
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Developers roll numbers</label>
          <input
            type="text"
            placeholder="Eg. 190102020, 190102021"
            name="rollNumbers"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="invitationEmail">Guide</label>
          <select name="guide" id="guide" onChange={handleChange} required>
            <option selected disabled>
              Select guide
            </option>
            {guides.data?.map((guide) => (
              <option value={guide._id} key={guide._id}>
                {guide.name}.{guide.email}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
        {response && <p>{response}</p>}
      </form>
    </div>
  );
};

export default AddStudent;
