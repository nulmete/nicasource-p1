import React from "react";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return <div>Details of: {name}</div>;
};

export default Details;
