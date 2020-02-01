import React from "react";
import PropTypes from "prop-types";
import { ApmRoute } from "@elastic/apm-rum-react";
import { init as initApm } from "@elastic/apm-rum";
import SystemHomepage from "./views/SystemHomepage";
import { Route, useParams } from "react-router-dom";
import heimdalConfig from "../config";
import MyNavbar from "./views/navbar";

export default function ComponentWrapper({ component, navbar, path, ...rest }) {
  const apm = initApm(heimdalConfig.APM);
  apm.addLabels(useParams());
  return (
    <Route path={path}>
      {navbar ? <MyNavbar /> : null}
      <ApmRoute component={component} path={path} />
    </Route>
  );
}
