import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import baseURL from "../utils/baseURL";

const VerificationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [verificationResponse, setVerificationResponse] = useState({});

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(`${baseURL}/api/evoluters/login`, {
          id,
        });
        setVerificationResponse({
          success: true,
          msg: res.data.msg,
        });
        const { token } = await res.data;
        localStorage.setItem("rubrica evoluter", token);
      } catch (error) {
        console.log(error);
        setVerificationResponse({
          success: false,
          msg: error.response.data.msg,
        });
      }
    };
    verify();
  }, [id]);

  return (
    <div className="h-screen grid place-content-center space-y-5">
      <h1>{verificationResponse.msg}</h1>
      {verificationResponse.success && (
        <button className="w-fit mx-auto" onClick={() => router.push("/home")}>
          Enter
        </button>
      )}
    </div>
  );
};

VerificationPage.getInitialProps = async () => {
  return { title: "Verification" };
};

export default VerificationPage;
