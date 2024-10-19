import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Privateroot = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : null}</div>;
};

export default Privateroot;
