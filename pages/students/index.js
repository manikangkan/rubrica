import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddStudent from "../../components/students/AddStudent.form";
import Search from "../../components/shared/Search.form";
import baseURL from "../../utils/baseURL";
import { useTable } from "react-table";

const StudentsPage = ({ studentsList }) => {
  const notRequired = ["_id", "__v"];
  const filteredKeys = Object.keys(studentsList[0]).filter(
    (key) => !notRequired.includes(key)
  );

  const [addStudent, setAddStudent] = useState(false);

  const columns = useMemo(
    () =>
      filteredKeys.map((studentKey, i) => {
        return {
          Header: studentKey.charAt(0).toUpperCase() + studentKey.slice(1),
          accessor: studentKey,
        };
      }),
    []
  );

  const data = useMemo(() => studentsList, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // if (studentsList?.length === 0) {
  //   return <h1>No students found</h1>;
  // }

  return (
    <>
      <div className="flex items-center justify-between">
        <Search />
        <button onClick={() => setAddStudent(!addStudent)}>Add</button>
      </div>
      {addStudent && <AddStudent setAddStudent={setAddStudent} />}
      {/* {studentsList?.map((student) => (
        <Link href={`/students/${student._id}`} key={student._id}>
          <div key={student._id}>{student.projectTitle}</div>
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
  const res = await axios.get(`${baseURL}/api/students`);
  const { data } = await res.data;
  return {
    props: {
      studentsList: data,
    },
  };
};

export default StudentsPage;
