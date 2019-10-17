import React, { Component } from "react";
import { Container, Link, Row } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import { walletAutocomplete } from "../api/gill/GESUSERS";

export default function WalletAutocomplete(props) {
  const [value, setValue] = React.useState("");
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
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    }
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
          id='basic-example'
        />
      </div>
    </div>
  );
}
