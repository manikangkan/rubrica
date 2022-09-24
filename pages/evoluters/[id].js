import axios from "axios";
import baseURL from "../../utils/baseURL";

const EvoluterPage = ({ evoluter }) => {
  console.table(evoluter);
  return (
    <div>
      {evoluter ? (
        <div>
          <h1>{evoluter.name}</h1>
          <p>{evoluter.projectTitle}</p>
        </div>
      ) : (
        <div>evoluter not found</div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`${baseURL}/api/evoluters/${id}`);
  const { data } = await res.data;
  return {
    props: {
      evoluter: data,
    },
  };
};

export default EvoluterPage;
