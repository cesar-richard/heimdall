import React from "react";
import PropTypes from "prop-types";
import { ApmRoute } from "@elastic/apm-rum-react";
import { init as initApm } from "@elastic/apm-rum";
import SystemHomepage from "./views/SystemHomepage";
import { useParams } from "react-router-dom";
import heimdalConfig from "../config";
import MyNavbar from "./views/navbar";

export default function ComponentWrapper({ component: Component, ...rest }) {
  const apm = initApm(heimdalConfig.APM);
  const { system_id, event_id } = useParams();
  apm.addLabels({ system_id, event_id });
  return (
    <>
      <MyNavbar />
      <Component />
    </>
  );
}

ComponentWrapper.propTypes = {};
