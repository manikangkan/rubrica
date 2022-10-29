import axios from "axios";
import { useMemo } from "react";
import { useTable } from "react-table";
import baseURL from "../../utils/baseURL";

const RubricPage = ({ rubric }) => {
  const { criteriaAndMarks } = rubric;

  // const notRequired = [
  //   "_id",
  //   "__v",
  //   "createdAt",
  //   "updatedAt",
  //   "criteriaAndMarks",
  // ];
  // const filteredKeys = Object.keys(criteriaAndMarks).filter(
  //   (key) => !notRequired.includes(key)
  // );
  const columns = useMemo(
    () =>
      Object.keys(criteriaAndMarks).map((criteriaAndMarksKey, i) => {
        console.log(criteriaAndMarksKey);
        return {
          Header:
            criteriaAndMarksKey.charAt(0).toUpperCase() +
            criteriaAndMarksKey.slice(1),
          accessor: criteriaAndMarksKey,
        };
      }),
    []
  );

  console.log({ columns });

  const data = useMemo(() => criteriaAndMarks, []);
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({
  //     columns,
  //     data,
  //   });

  console.log({ data });

  return (
    <section>
      <h1>Rubric Page</h1>
      {rubric ? (
        <>
          <div>
            <h1>{rubric.name}</h1>
            <p>{rubric.description}</p>
          </div>
          {/* <table {...getTableProps()}>
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
          </table> */}
        </>
      ) : (
        <div>Rubric not found</div>
      )}
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  console.log(id);
  const res = await axios.get(`${baseURL}/api/rubrics/${id}`);
  const { data } = await res.data;
  return {
    props: {
      rubric: data,
    },
  };
};

export default RubricPage;
