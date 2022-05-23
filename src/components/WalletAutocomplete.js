import React from "react";
import PropTypes from "prop-types";
import { Container, Link, Row } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import { walletAutocomplete } from "../api/gill/GESUSERS";
import { useParams } from "react-router-dom";

export default function WalletAutocomplete(props) {
  const [current, setCurrent] = React.useState(props.value || "");
  const [suggestions, setSuggestions] = React.useState([""]);
  const { system_id, event_id } = useParams();

  const getSuggestions = value => {
    const escapedValue = value.trim();
    if ("" === escapedValue) {
      return [];
    }

    walletAutocomplete({
      queryString: escapedValue,
      limit: 10,
      system_id,
      event: event_id
    }).then(data => {
      setSuggestions(data.data);
    });
  };

  const getSuggestionValue = suggestion =>
    `${suggestion.name} W${suggestion.id}`;

  const renderSuggestion = suggestion => (
    <Container>
      <Row>
        {suggestion.name} W{suggestion.id}
      </Row>
      <Row>{suggestion.username}</Row>
      <Row>
        {suggestion.tag ? `Tag: ${suggestion.tag}` : ""}
        {suggestion.barcode ? `Barcode: ${suggestion.barcode}` : ""}
      </Row>
    </Container>
  );

  const inputProps = {
    value: current,
    onChange: (event, { newValue }) => {
      setCurrent(newValue.toString());
    }
  };

  var shouldRenderSuggestions = function shouldRenderSuggestions(value) {
    return "string" === typeof value ? 3 < value.trim().length : false;
  };

  return (
    <div id='basic-example'>
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            getSuggestions(value);
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
          onSuggestionSelected={(event, datas) =>
            props.onSuggestionSelected(datas)}
        />
      </div>
    </div>
  );
}

WalletAutocomplete.propTypes = {
  value: PropTypes.object,
  onSuggestionSelected: PropTypes.func.isRequired
};
