import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import AddStudent from "../../components/students/AddStudent.form";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";

const StudentsPage = ({ studentsList }) => {
  // console.table(studentsList);

  const [addStudent, setAddStudent] = useState(false);

  if (studentsList?.length === 0) {
    return <h1>No students found</h1>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Search />
        <button onClick={() => setAddStudent(!addStudent)}>Add</button>
      </div>
      {addStudent && <AddStudent setAddStudent={setAddStudent} />}
      {studentsList?.map((student) => (
        <Link href={`/students/${student._id}`}>
          <div key={student._id}>{student.name}</div>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/students`);
  const { data } = await res.data;
  return {
    props: {
      studentsList: data,
    },
  };
};

export default StudentsPage;
