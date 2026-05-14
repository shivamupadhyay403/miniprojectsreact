import React from "react";

const Pagination = ({ start, end, totalPages,currentPage,setCurrentPage }) => {
    const onPageChange=(page)=>{
        setCurrentPage(page)
    }
  return (
    <>
      <div>
        Showing {start} - {end} of total {totalPages} Pages
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              fontWeight: currentPage === page ? "bold" : "normal",
              textDecoration: currentPage === page ? "underline" : "none",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
