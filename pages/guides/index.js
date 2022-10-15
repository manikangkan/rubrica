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
      <div className="flex justify-between items-center">
        <Search />
        <button onClick={() => setAddGuide(!addGuide)}>Add</button>
      </div>
      {addGuide && <AddGuide setAddGuide={setAddGuide} />}
      {/* {guidesList?.map((guide) => (
        <Link href={`/guides/${guide._id}`} key={guide._id}>
          <div key={guide._id}>{guide.name}</div>
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
