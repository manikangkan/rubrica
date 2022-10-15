export const getTableHeader = (data) => {
  console.log({ data });
  Object.keys(data[0]).map((key, i) => {
    return {
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    };
  });
};
