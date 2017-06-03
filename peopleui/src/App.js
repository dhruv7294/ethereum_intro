import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import _ from "lodash"

var eth_client = new Web3(new Web3.providers.HttpProvider("Http://localhost:8545"))

var peopleAddress = '0x4d2e23956abc9f0154be6721665dd499ee7fdf4e'
var peopleContractABI = [{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"_phone","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"name","type":"bytes32"},{"name":"email","type":"bytes32"},{"name":"phone","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getpeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"}]
var peoplecontract = eth_client.eth.contract(peopleContractABI).at(peopleAddress)

class App extends Component {

  constructor(props)
  {
    super(props)
    this.state = {
      name : [],
      email : [],
      phone : []
    }
  }

  componentWillMount()
  {
    var data = (peoplecontract.getpeople())
    this.setState({
      name: String(data[0]).split(","),
      email: String(data[1]).split(","),
      phone: String(data[2]).split("," )
    })
  }

  render() {

    var tableRows = []

    _.each(this.state.name, (value,index) => {
      tableRows.push(
        <tr>
          <td>{eth_client.toAscii(this.state.name[index])}</td>
          <td>{eth_client.toAscii(this.state.email[index])}</td>
          <td>{this.state.phone[index]}</td>
        </tr>
      )
    })


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to a dApp built with React</h2>
        </div>
        <div className="App-content">

        <table>
          <thead>
            <tr>
              <th>Name </th>
              <th>Email </th>
              <th>phone </th>
            </tr>
          </thead>
            <tbody>
              {tableRows}
            </tbody>
        </table>

        </div>
      </div>

    );
  }
}

export default App;
