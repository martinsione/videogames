import styles from "./Pagination.module.css";

export const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  setPage,
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
}) => {
  const pageNumbers = Array.from(
    Array(Math.ceil(totalItems / itemsPerPage)).keys()
  );
  return (
    <div>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage - 1 === 0}
      >
        Previous
      </button>
      {pageNumbers.map((i) => (
        <button
          key={i}
          className={styles.pageItem}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage + 1 > pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};
