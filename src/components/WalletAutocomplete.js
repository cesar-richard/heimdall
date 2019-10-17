import React from "react";
import PropTypes from "prop-types";
import { Container, Link, Row } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import { walletAutocomplete } from "../api/gill/GESUSERS";

export default function WalletAutocomplete(props) {
  const [current, setCurrent] = React.useState(props.value || "");
  const [suggestions, setSuggestions] = React.useState([""]);

  const getSuggestions = value => {
    const escapedValue = value.trim();

    if (escapedValue === "") {
      return [];
    }

    walletAutocomplete({ queryString: escapedValue, limit: 10 }).then(data => {
      setSuggestions(data.data);
    });
  };

  const getSuggestionValue = suggestion => suggestion.id;

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
    return typeof value === "string" ? value.trim().length > 3 : false;
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
            props.onSuggestionSelected(datas)
          }
        />
      </div>
    </div>
  );
}

WalletAutocomplete.propTypes = {
  value: PropTypes.string,
  onSuggestionSelected: PropTypes.func.isRequired
};
