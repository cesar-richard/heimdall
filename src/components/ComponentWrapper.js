import React from "react";
import PropTypes from "prop-types";
import { ApmRoute } from "@elastic/apm-rum-react";
import { init as initApm } from "@elastic/apm-rum";
import SystemHomepage from "./views/SystemHomepage";
import { Route, useParams } from "react-router-dom";
import heimdalConfig from "../config";
import MyNavbar from "./views/navbar";

export default function ComponentWrapper({
  component,
  navbar,
  path,
  systemAware,
  eventAware,
  ...rest
}) {
  const apm = initApm(heimdalConfig.APM);
  apm.addLabels(useParams());
  const pathPrefix = eventAware
    ? "/:system_id(d+)/:event_id(d+)"
    : systemAware
    ? "/:system_id(d+)"
    : "";
  return (
    <Route path={path}>
      {navbar ? <MyNavbar /> : null}
      <ApmRoute component={component} path={`${pathPrefix}/${path}`} />
    </Route>
  );
}
