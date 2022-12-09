import axios from "axios";
import Link from "next/link";
import { useMemo } from "react";
import { useTable } from "react-table";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";
import CreateRubric from "./createRubric";

const RubricsPage = ({ rubricsList }) => {
  const notRequired = [
    "_id",
    "criteriaAndMarks",
    "__v",
    "createdAt",
    "updatedAt",
  ];
  const filteredKeys = Object.keys(rubricsList[0]).filter(
    (key) => !notRequired.includes(key)
  );

  const columns = useMemo(
    () =>
      filteredKeys.map((rubricKey, i) => {
        return {
          Header: rubricKey.charAt(0).toUpperCase() + rubricKey.slice(1),
          accessor: rubricKey,
        };
      }),
    []
  );

  const data = useMemo(() => rubricsList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (rubricsList.length === 0) {
    return <h1>No rubrics found</h1>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Search />
        <button onClick={() => setAddStudent(!addStudent)}>Add</button>
      </div>
      {/* {rubricsList?.map((rubric) => (
        <Link href={`/rubrics/${rubric._id}`} key={rubric._id}>
          <div key={rubric._id}>{rubric.name}</div>
        </Link>
      ))} */}
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th
                      key={key}
                      {...restColumn}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody
          {...getTableBodyProps}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {/* link to open each rubric */}
                <td>
                  <Link href={`/rubrics/${row.original._id}`} passHref>
                    <a
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-sm shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                      View
                    </a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CreateRubric />
    </>
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
