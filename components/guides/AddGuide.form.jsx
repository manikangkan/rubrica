import axios from "axios";
import { useState } from "react";
import baseURL from "../../utils/baseURL";

const AddGuide = ({ setAddGuide }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

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
      const { data } = await axios.post(`${baseURL}/api/guides`, formData);
      setResponse(data.msg);
    } catch (error) {
      setResponse(error.response?.data.msg);
    }
  };

  return (
    <div className="bg-white absolute right-0 top-0 bottom-0 h-full max-w-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4>Add new guide details</h4>
        <button
          className="bg-transparent text-slate-800"
          onClick={() => setAddGuide(false)}>
          Close
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Guide name</label>
          <input
            type="text"
            placeholder="Eg. Manikangkan Das"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="invitationEmail">Guide email</label>
          <input
            type="text"
            placeholder="Eg. manikangkan.das@rubrica.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
        {response && <p>{response}</p>}
      </form>
    </div>
  );
};

export default AddGuide;
