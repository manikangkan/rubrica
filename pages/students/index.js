import axios from "axios";
import Link from "next/link";
import AddStudent from "../../components/AddStudent.form";
import baseURL from "../../utils/baseURL";

const StudentsPage = ({ studentsList }) => {
  // console.table(studentsList);

  return (
    <section>
      <AddStudent />

      {studentsList?.map((student) => (
        <Link href={`/students/${student._id}`}>
          <div key={student._id}>{student.name}</div>
        </Link>
      ))}
    </section>
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
