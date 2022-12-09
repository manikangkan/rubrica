import axios from "axios";
import Link from "next/link";
import { useMemo } from "react";
import { useTable } from "react-table";
import baseURL from "../../utils/baseURL";

const EvolutersPage = ({ evolutersList }) => {
  const notRequired = ["_id", "__v"];
  const filteredKeys = Object.keys(evolutersList[0]).filter(
    (key) => !notRequired.includes(key)
  );

  const columns = useMemo(
    () =>
      filteredKeys.map((evoluterKey, i) => {
        return {
          Header: evoluterKey.charAt(0).toUpperCase() + evoluterKey.slice(1),
          accessor: evoluterKey,
        };
      }),
    []
  );

  const data = useMemo(() => evolutersList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      {/* {evolutersList?.map((evoluter) => (
        <Link href={`/evoluters/${evoluter._id}`} key={evoluter._id}>
          <div key={evoluter._id}>{evoluter.name}</div>
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
