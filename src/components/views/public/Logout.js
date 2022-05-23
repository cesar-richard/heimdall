import React, { useParams } from "react";
import {useNavigate} from "react-router-dom";


export default function Logout() {
  localStorage.removeItem("accessToken");
  const { system_id } = useParams();
  let navigate = useNavigate();
  return navigate(system_id ? `/login` : "/");
}
