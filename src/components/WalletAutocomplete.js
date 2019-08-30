import React, { Component } from "react";
import { Link } from "react-bootstrap";
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
    <span>
      {suggestion.name} W{suggestion.id}
    </span>
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
