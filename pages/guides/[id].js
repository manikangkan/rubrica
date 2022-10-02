import axios from "axios";
import baseURL from "../../utils/baseURL";

const GuidePage = ({ guide }) => {
  console.table(guide);
  return (
    <div>
      {guide ? (
        <div>
          <h1>{guide.name}</h1>
          <h1>{guide.email}</h1>
        </div>
      ) : (
        <div>guide not found</div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`${baseURL}/api/guides/${id}`);
  const { data } = await res.data;
  return {
    props: {
      guide: data,
    },
  };
};

export default GuidePage;
