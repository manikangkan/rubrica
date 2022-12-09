import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import AddGuide from "../../components/guides/AddGuide.form";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";

const GuidesPage = ({ guidesList }) => {
  const [addGuide, setAddGuide] = useState(false);

  const columns = useMemo(
    () =>
      Object.keys(guidesList[0]).map((guideKey, i) => {
        return {
          Header: guideKey.charAt(0).toUpperCase() + guideKey.slice(1),
          accessor: guideKey,
        };
      }),
    []
  );

  const data = useMemo(() => guidesList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (guidesList?.length === 0) {
    return <h1>No guides found</h1>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Search />
        <button onClick={() => setAddGuide(!addGuide)}>Add</button>
      </div>
      {addGuide && <AddGuide setAddGuide={setAddGuide} />}
      {/* {guidesList?.map((guide) => (
        <Link href={`/guides/${guide._id}`} key={guide._id}>
          <div key={guide._id}>{guide.name}</div>
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
              </tr>
            );
          })}
        </tbody>
      </table>
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
