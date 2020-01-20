import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../api/gill/resources";
import { ListGroup, Spinner } from "react-bootstrap";
import Fundation from "./Fundation";
import FundationModel from "../../../models/FundationModel";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function FundationList(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [fundations, setFundations] = React.useState([]);
  const { system_id, event_id } = useParams();
  React.useEffect(() => {
    setLoading(true);
    getFundations({ system_id, event_id })
      .then(data => {
        setFundations(data.data);
        setLoading(false);
      })
      .catch(data => toast.error(data));
  }, [event_id, system_id]);

  let fundationList = [];
  if (isLoading) {
    return (
      <Spinner animation='border' role='status' size='sm'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }

  if (0 !== fundations.length) {
    fundationList = fundations.map((fundation, index) => (
      <Fundation key={fundation.id} fundation={fundation} />
    ));
    return <ListGroup>{[fundationList]}</ListGroup>;
  }
  return "Error";
}

FundationList.propTypes = {
  fundations: PropTypes.arrayOf(PropTypes.instanceOf(FundationModel)),
  isLoading: PropTypes.bool
};
