import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Card,
  Container,
  ListGroup,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { subscribeNfc } from "../../../api/scarlet";
import { toast } from "react-toastify";
import Switch from "react-bootstrap-switch";
import Wallet from "../wallet";
import UserRights from "./userRights";
import DataTable from "./dataTable";

export default function UserDashboard(props) {
  return (
    <DataTable />
  );
}

UserDashboard.propTypes = {};
