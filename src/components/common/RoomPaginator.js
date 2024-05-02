import React from "react"



const RoomPaginator = ({currentPage,totalPages,onPageChange}) => {
    const pagenumbers = [];
    for(let i=0;i<totalPages;i++){
       pagenumbers.push(i+1);
    }
  return (
    <nav aria-label="Page navigation" className="room-paginator-pages">
        <ul className="pagination room-paginator-pages justify-content-center">
            {pagenumbers.map((pageNumber) => (
                <li key={pageNumber} className={`page-item ${currentPage===pageNumber?'active':""}`}>
                  <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>

            ))}

        </ul>
    </nav>
  )
}

export default RoomPaginator