import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../features/posts/postsSlice";

const Page = ({ page, currentId }) => {
  const dispatch = useDispatch();
  const { currentPage, numberOfPages } = useSelector((state) => state.posts);

  // Main
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, currentId]);

  return (
    <Pagination
      count={numberOfPages}
      page={page || 1}
      color="secondary"
      sx={{
        mt: "12px",
        py: "4px",
        display: "flex",
        justifyContent: "center",
      }}
      renderItem={(item) => (
        <PaginationItem
          variant="text"
          component={Link}
          to={`/posts?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Page;