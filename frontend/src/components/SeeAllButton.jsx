import React from "react";
import { Link } from "react-router-dom";

const SeeAllButton = ({ route }) => {
  return (
    <Link to={route}>
      <button className="text-xs ml-4 border px-2 py-1 rounded-2xl">
        See all
      </button>
    </Link>
  );
};

export default SeeAllButton;
