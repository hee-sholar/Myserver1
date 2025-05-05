const getPaginationData = (page = 1, limit = 10, totalItems = 0) => {
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const skip = (currentPage - 1) * itemsPerPage;
  
    return {
      currentPage,
      itemsPerPage,
      skip,
      totalPages,
    };
  };
  
export default getPaginationData;
  