import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";

const CategoriesPage = ({ categoriesList }) => {
  // console.table(categoriesList);

  if (categoriesList?.length === 0) {
    return <h1>No categories found</h1>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Search />
        <button>Add</button>
      </div>
      {categoriesList?.map((category) => (
        <Link href={`/categories/${category._id}`} key={category._id}>
          <div key={category._id}>{category.name}</div>
        </Link>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/categories`);
  const { data } = await res.data;
  return {
    props: {
      categoriesList: data,
    },
  };
};

export default CategoriesPage;
