import axios from "axios";
import baseURL from "../../utils/baseURL";

const StudentPage = ({ student }) => {
  console.table(student);
  return (
    <div>
      {student ? (
        <div>
          <h1>{student.name}</h1>
          <p>{student.projectTitle}</p>
        </div>
      ) : (
        <div>Student not found</div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`${baseURL}/api/students/${id}`);
  const { data } = await res.data;
  return {
    props: {
      student: data,
    },
  };
};

export default StudentPage;
