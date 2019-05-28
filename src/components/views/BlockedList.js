import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoading } from "../../actions/connectActions";
import { getAll as getAllBlocked } from "../../api/gill/BLOCKED";
import { fundations } from "../../api/gill/resources";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/fr";

class BlockedList extends Component {
  constructor() {
    super();
    this.state = {
      blockedPeoples: [],
      loading: true
    };
  }

  componentDidMount() {
    fundations().then(funList => {
      funList.data.push({
        id: null,
        name: "System",
      });
      this.setState({ fundations: funList.data });
      let funArray = Object.keys(funList.data).map(key => {
        return getAllBlocked(funList.data[key].id).then(data => {
          return data.data;
        });
      });
      let ret = [];
      Promise.all(funArray)
        .then(data => {
          data.forEach(element => {
            if (Object.entries(element).length !== 0) ret.push(element);
          });
          return ret;
        })
        .then(data => {
          let ret = [];
          data.forEach(element => {
            Object.entries(element).map(val => {
              ret.push(val);
              return val;
            });
          });
          this.setState({ blockedPeoples: ret, loading: false });
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    if (this.state.loading) return "Loading";
    else {
      let list = [];
      if (this.state.blockedPeoples !== null) {
        list = Object.keys(this.state.blockedPeoples).map(key => {
          const blockedOne = this.state.blockedPeoples[key][1];

          return (
            <tr key={key}>
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
              <td>
                {
                  this.state.fundations.filter(function(el) {
                    return el.id === blockedOne.fun_id;
                  })[0].name
                }
              </td>
            </tr>
          );
        });
      }

      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Raison</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Login</th>
              <th>Start</th>
              <th>Stop</th>
              <th>Fondation</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading
});

const mapDispatchToProps = dispatch => ({
  setLoading: loading => dispatch(setLoading(loading))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockedList);
