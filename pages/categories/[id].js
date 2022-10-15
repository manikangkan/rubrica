import axios from "axios";
import baseURL from "../../utils/baseURL";

const CategoryPage = ({ category }) => {
  console.table(category);
  return (
    <div>
      {category ? (
        <div>
          <h1>{category.name}</h1>
        </div>
      ) : (
        <div>category not found</div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`${baseURL}/api/categories/${id}`);
  const { data } = await res.data;
  return {
    props: {
      category: data,
    },
  };
};

export default CategoryPage;
