import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword }) => {
  console.log(keyword);
  return (
    pages > 1 && (
      <>
        <div className="paginate">
          {[...Array(pages).keys()].map((x, index) => {
            return (
              <Link
                to={`${keyword ? `/search/${keyword}` : ""}/page/${x + 1}`}
                className={x + 1 === page ? "active" : ""}
                key={index}
              >
                {x + 1}
              </Link>
            );
          })}
        </div>
      </>
    )
  );
};

export default Paginate;
