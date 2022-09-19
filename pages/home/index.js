import axios from "axios";
import baseURL from "../../utils/baseURL";

const Home = ({ evoluterName }) => {
  return (
    <div className="h-full grid place-content-center space-y-4">
      <h1>Good morning, {evoluterName}</h1>
      <p>
        Welcome to Rubrica, before moving forward please go through the
        following steps -
      </p>
      <ul>
        <li>1. Create a rubric</li>
        <li>2. Create a student</li>
        <li>3. Assign a rubric to a student</li>
        <li>4. Start grading</li>
      </ul>
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   const { id } = context.query;
//   const res = await axios.get(`${baseURL}/api/evoluters/${id}`);
//   const { data } = await res.data;
//   return {
//     props: {
//       evoluterName: data.name,
//     },
//   };
// };

export default Home;
