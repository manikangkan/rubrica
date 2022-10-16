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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumn}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
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
