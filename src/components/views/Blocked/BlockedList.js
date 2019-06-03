import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoading, setBlockedPeoples } from "../../../actions/connectActions";
import { Table, ProgressBar } from "react-bootstrap";
import { fundations } from '../../../actions/fetch';
import Fundation from './Fundation';
import Moment from "react-moment";
import "moment/locale/fr";

class BlockedList extends Component {
  componentDidMount() {
    this.props.fetchFundations();
  }

  render() {
    /*if (!(this.state.dataFetched || this.state.dataFetching)) {
      this.setState({ dataFetching: true });
      fundations().then(funList => {
        funList.data.push({
          id: null,
          name: "System"
        });
        this.setState({ fundations: funList.data });
        let funArray = Object.keys(funList.data).map(key => {
          return getAllBlocked(funList.data[key].id).then(data => {
            this.setState({
              fundationsLoadedCount: this.state.fundationsLoadedCount + 1
            });
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
            this.setState({ dataFetching: false, dataFetched: true });
            this.props.setLoading(false);
            this.props.setBlockedPeoples(ret.data);
          })
          .catch(err => {
            console.error(err);
            this.setState({ dataFetching: false });
            this.setLoading(false);
          });
      });
    }*/
    let fundationList = [];
      return (
        <div>
          <div>Loading</div>
          <ProgressBar animated now={now} label={`${now}%`} />
        </div>
      );
    } else {
      if (this.props.blockedPeoples !== null) {
        fundationList = Object.keys(this.props.blockedPeoples).map(key => {
        return (<Fundation fundationId={this.props.blockedPeoples[key][1].id} />);
      });
    }
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
          <tbody>{fundationList}</tbody>
        </Table>
      );
    }
  }

  const mapStateToProps = state => ({
    isLoading: () => state.connect.loading,
    blockedPeoples: () => state.connect.blockedPeoples
  });

  const mapDispatchToProps = dispatch => ({
    setLoading: loading => dispatch(setLoading(loading)),
    setBlockedPeoples: blockedPeoples =>
      dispatch(setBlockedPeoples(blockedPeoples)),
      fetchFundations: () => dispatch(fundations()),
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockedList);
