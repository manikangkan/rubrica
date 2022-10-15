import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import baseURL from "../../utils/baseURL";

const Home = () => {
  const router = useRouter();
  const [response, setResponse] = useState();
  useEffect(() => {
    const getEvoluter = async () => {
      try {
        const token = window.localStorage.getItem("rubrica evoluter");
        if (token) {
          const { userId } = jwtDecode(token);
          const res = await axios.get(`${baseURL}/api/evoluters/${userId}`);
          const { data } = await res.data;
          setResponse(data.name);
        } else router.push("/");
      } catch (error) {
        setResponse(error.response.data.msg);
      }
    };
    getEvoluter();
  }, []);
  console.log(response);
  return (
    <div className="h-full grid place-content-center space-y-4">
      <h1>Good morning, {response}</h1>
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

Home.getInitialProps = async () => {
  return { title: "Home" };
};

export default Home;
