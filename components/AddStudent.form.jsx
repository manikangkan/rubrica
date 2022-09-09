import { useState } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    names: "",
    projectTitle: "",
    projectDescription: "",
    rollNumbers: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.includes(",")
        ? e.target.value.split(",").map((item) => item.trim())
        : e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new student deatails</h1>
      <input
        type="text"
        placeholder="Developer names, please separate with comma"
        name="names"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Project Title"
        name="projectTitle"
        onChange={handleChange}
      />
      <textarea
        cols="30"
        rows="10"
        name="projectDescription"
        onChange={handleChange}
        defaultValue={"Project Description"}
      />
      <input
        type="text"
        placeholder="Student roll numbers"
        name="rollNumbers"
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddStudent;
