import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useState } from "react";
import baseURL from "../../utils/baseURL";

const CreateRubric = () => {
  const router = useRouter();

  const [createRubricFormData, setCreateRubricFormData] = useState({
    name: "",
    description: "",
    criterias: [],
    marks: [],
  });

  const handleCreateRubricFormChange = (e) => {
    setCreateRubricFormData({
      ...createRubricFormData,
      [e.target.name]: e.target.value.includes(",")
        ? e.target.value.split(",")
        : e.target.value,
    });
  };

  const handleCreateRubricFormSubmit = async (e) => {
    e.preventDefault();

    const { name, description, criterias, marks } = createRubricFormData;

    try {
      const token = window.localStorage.getItem("rubrica evoluter");
      if (token) {
        const { userId } = jwtDecode(token);
        await axios.post(`${baseURL}/api/rubrics`, {
          name,
          description,
          createdBy: userId,
          criteriaAndMarks: criterias.map((criteria, i) => {
            return {
              criteria,
              marks: marks.map((mark) => {
                return {
                  mark,
                };
              }),
            };
          }),
        });
        setCreateRubricFormData({
          name: "",
          description: "",
          criterias: [],
          marks: [],
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Rubric</h1>
      <form onSubmit={handleCreateRubricFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={createRubricFormData.name}
          onChange={handleCreateRubricFormChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={createRubricFormData.description}
          onChange={handleCreateRubricFormChange}
        />
        <label htmlFor="criterias">Criteria</label>
        <input
          type="text"
          name="criterias"
          value={createRubricFormData.criterias}
          onChange={handleCreateRubricFormChange}
        />
        <label htmlFor="marks">Mark</label>
        <input
          type="text"
          name="marks"
          value={createRubricFormData.marks}
          onChange={handleCreateRubricFormChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRubric;
