import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import AddGuide from "../../components/guides/AddGuide.form";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";

const GuidesPage = ({ guidesList }) => {
  // console.table(guidesList);

  const [addGuide, setAddGuide] = useState(false);

  if (guidesList?.length === 0) {
    return <h1>No guides found</h1>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Search />
        <button onClick={() => setAddGuide(!addGuide)}>Add</button>
      </div>
      {addGuide && <AddGuide setAddGuide={setAddGuide} />}
      {guidesList?.map((guide) => (
        <Link href={`/guides/${guide._id}`} key={guide._id}>
          <div key={guide._id}>{guide.name}</div>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/guides`);
  const { data } = await res.data;
  return {
    props: {
      guidesList: data,
    },
  };
};

export default GuidesPage;
