import { Link } from "react-router";

interface PaginationProps {
  currentPage: number;
  count: number;
  USERS_PER_PAGE: number;
}

export default function Pagination({
  currentPage,
  count,
  USERS_PER_PAGE,
}: PaginationProps) {
  return (
    <ul className="flex justify-between items-center text-sm mt-8 mx-10">
      <li>
        {currentPage > 1 && (
          <Link to={{ pathname: "/admin", search: `?page=${currentPage - 1}` }}>
            <span className="flex items-center gap-1">← Previous</span>
          </Link>
        )}
        {currentPage <= 1 && (
          <span className="flex items-center gap-1 text-zinc-400 cursor-not-allowed">
            ← Previous
          </span>
        )}
      </li>

      {typeof count === "number" && (
        <li className="flex-grow flex justify-center">
          <ul className="flex items-center gap-3">
            {[...new Array(Math.ceil(count / USERS_PER_PAGE))].map(
              (_, index) => {
                const page = index + 1;
                return (
                  <li key={page}>
                    <div
                      className={
                        page === currentPage
                          ? "px-3 py-1 border border-gray-300 rounded-md bg-black text-white hover:bg-gray-700"
                          : "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                      }
                    >
                      <Link
                        to={{ pathname: "/admin", search: `?page=${page}` }}
                      >
                        {page}
                      </Link>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </li>
      )}

      <li>
        {currentPage < Math.ceil(count / USERS_PER_PAGE) && (
          <Link to={{ pathname: "/admin", search: `?page=${currentPage + 1}` }}>
            <span className="flex items-center gap-1">Next →</span>
          </Link>
        )}
        {currentPage >= Math.ceil(count / USERS_PER_PAGE) && (
          <span className="flex items-center gap-1 text-zinc-400 cursor-not-allowed">
            Next →
          </span>
        )}
      </li>
    </ul>
  );
}
