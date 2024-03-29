import React, { Component, useParams } from "react";
import { Redirect } from "react-router-dom";

export default function Logout(props) {
  localStorage.removeItem("accessToken");
  const { system_id } = useParams();
  return <Redirect to={system_id ? `/${system_id}/login` : "/80405/login"} />;
}
