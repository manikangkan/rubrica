import axios from "axios";
import Link from "next/link";
import baseURL from "../../utils/baseURL";

const RubricsPage = ({ rubricsList }) => {
  if (rubricsList.length === 0) {
    return <h1>No rubrics found</h1>;
  }

  return (
    <section>
      <h1>Rubrics Page</h1>
      {rubricsList?.map((rubric) => (
        <Link href={`/rubrics/${rubric._id}`}>
          <div key={rubric._id}>{rubric.name}</div>
        </Link>
      ))}
    </section>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/rubrics`);
  const { data } = await res.data;
  return {
    props: {
      rubricsList: data,
    },
  };
};

export default RubricsPage;
