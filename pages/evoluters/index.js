import axios from "axios";
import Link from "next/link";
import baseURL from "../../utils/baseURL";

const EvolutersPage = ({ evolutersList }) => {
  console.log(evolutersList);
  return (
    <div>
      {evolutersList?.map((evoluter) => (
        <Link href={`/evoluters/${evoluter._id}`} key={evoluter._id}>
          <div key={evoluter._id}>{evoluter.name}</div>
        </Link>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/evoluters`);
  const { data } = await res.data;
  return {
    props: {
      evolutersList: data,
    },
  };
};

export default EvolutersPage;