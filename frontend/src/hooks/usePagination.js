import { useState, useMemo } from 'react';

export function usePagination(data = [], initialRowsPerPage = 8) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, safeCurrentPage, rowsPerPage]);

  const goToPage = (page) => {
    const pageNum = Number(page);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const nextPage = () => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (safeCurrentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const changeRowsPerPage = (newRows) => {
    setRowsPerPage(Number(newRows));
    setCurrentPage(1);
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    rowsPerPage,
    paginatedData,
    totalItems: data.length,
    goToPage,
    nextPage,
    prevPage,
    changeRowsPerPage,
  };
}
