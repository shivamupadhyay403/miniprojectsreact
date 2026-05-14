import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Table from "react-bootstrap/Table";
import Pagination from "./Pagination";
const DataTable = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { data, isLoading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos",
  );

  useEffect(() => {
    if (!isLoading) {
      setTableData(data);
    }
  }, [isLoading, data]);
  useEffect(() => {
    if (tableData?.length > 0) {
      let startIndex =
        currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
      let endIndex = Math.min(currentPage * ITEMS_PER_PAGE);
      setPaginatedData(tableData.slice(startIndex, endIndex));
      setStart(startIndex);
      setEnd(endIndex);
    }
  }, [currentPage, tableData]);
  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item) => (
            <tr key={item?.id}>
              <td>{item?.id}</td>
              <td>{item?.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        start={start}
        end={end}
        totalPages={Math.ceil(tableData?.length) / ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default DataTable;
