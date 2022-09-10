import axios from "axios";
import { useState } from "react";
import baseURL from "../../utils/baseURL";

const AuthForm = ({ data }) => {
  const [formData, setFormData] = useState(
    data.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.name === "login") {
      try {
        const { data } = await axios.post(`${baseURL}/api/auth`, formData);
        console.warn("data", data);
        setResponse(data.msg);

        // setFormData(
        //   data.fields.reduce((acc, field) => {
        //     acc[field.name] = "";
        //     return acc;
        //   }, {})
        // );

        localStorage.setItem("rubrica", data.token);
      } catch (error) {
        console.warn(error);
        setResponse(error.response?.data.msg);
      }
    } else {
      console.warn("formData", formData);
    }
  };
  return (
    <div className="sm:w-1/2 md:w-1/3 space-y-4">
      <h4>{response ? response : data.title}</h4>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        {data.fields.map((field, index) => {
          return (
            <div className="flex flex-col space-y-2" key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                required
                autoFocus={index === 0}
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button className="bg-black text-white py-2 rounded-md" type="submit">
          {data.button}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
