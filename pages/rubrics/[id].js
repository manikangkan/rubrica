import axios from "axios";
import baseURL from "../../utils/baseURL";

const RubricPage = ({ rubric }) => {
  return (
    <section>
      <h1>Rubric Page</h1>
      {rubric ? (
        <div>
          <h1>{rubric.name}</h1>
          <p>{rubric.description}</p>
        </div>
      ) : (
        <div>Rubric not found</div>
      )}
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`${baseURL}/api/rubrics/${id}`);
  const { data } = await res.data;
  return {
    props: {
      rubric: data,
    },
  };
};

export default RubricPage;
