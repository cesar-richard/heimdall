import React, { Component } from "react";

class FundationDetails extends Component {
  render() {
    return <div>Puteuh !</div>;
  }
}

export default FundationDetails;
/*Object.values(
      this.props.blocked().data[this.props.fundation.id].data
    ).map(blockedOne => {
      console.log(blockedOne);
      return (
        <tr key={blockedOne.blo_id}>
          <td>{blockedOne.blo_raison}</td>
          <td>{blockedOne.usr_firstname}</td>
          <td>{blockedOne.usr_lastname}</td>
          <td>{blockedOne.login}</td>
          <td>
            <Moment format="DD/MM/YYYY HH:mm">
              {blockedOne.blo_insert}
            </Moment>
          </td>
          <td>
            <Moment format="DD/MM/YYYY HH:mm">
              {blockedOne.blo_removed}
            </Moment>
          </td>
          <td>{this.props.name}</td>
        </tr>
      );
    });*/
