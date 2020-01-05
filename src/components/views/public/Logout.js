import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function Logout(props) {
  localStorage.removeItem("accessToken");
  return <Redirect to='/' />;
}
