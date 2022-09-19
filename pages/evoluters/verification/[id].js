import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import baseURL from "../../../utils/baseURL";

const VerificationPage = ({response}) => {
 

  return <div>{response ? <h1>{response}</h1> : <h1>Verifying...</h1>}</div>;
};


export const getServerSideProps = async (context) => {
  const { id } = context.query;
  let response = "";
  try {
    const res = await axios.post(`${baseURL}/api/evoluters/verification`, {
      id,
    });
    const { data } = await res.data;
    response = data.msg;
  } catch (error) {
    console.log(error);
    response = error.response.data.msg;
  }
  return {
    props: {
      response,
    },
  };
};


export default VerificationPage;
