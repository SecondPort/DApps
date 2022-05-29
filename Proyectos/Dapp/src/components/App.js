import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Color from '../abis/Color.json';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }

    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // se cargan las cuentas disponibles en web3
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });//se guarda la cuenta 0
    const networkId = await web3.eth.net.getId(); //obtener el id de la red ejemplo 5777
    const networkData = Color.networks[networkId];//obtener la data de la red
    if(networkData) {
      const abi = Color.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      //funcion totalSupply del smart contract
      const totalSupply = await contract.methods.totalSupply().call();//call() and send() dependen del tipo de funcion en el smart contract, call() = view, send() = payable o consumo de gas
      this.setState({ totalSupply });
      console.log(totalSupply)
      // cargar los colores
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i-1).call();
        this.setState({ colors: [...this.state.colors, color] });
      }
    }else{
      window.alert('Smart contract not deployed to detected network.');
    }
  }

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      colors: [],
      totalSupply: 0,
      contract: null,
      colors: [],
    };
  }

  mint = (color) => {
    this.state.contract.methods.safeMint(color).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ colors: [...this.state.colors, color] });
    });
  }

/*   burn = (tokenId) => {
    this.state.contract.methods._burn(tokenId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ colors: this.state.colors.filter((color,key) => {
        return key !== tokenId;
      }) });
    });
  } */

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://blockstellart.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            DApp
          </a>
          <ul className= "navbar-nav px.3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white">
                  <span id='account'>{this.state.account}</span>
                </small>
              </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>NFT's de colores</h1>
                <form onSubmit={(event)=>{
                  event.preventDefault();
                  const color = this.color.value;
                  this.mint(color);
                }}>
                  <input type="text"
                  className="form-control mb-1"
                  placeholder="EJ: #FFFFFF"
                  ref={(input) => { this.color = input; }}
                  ></input>
                  <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Mint"
                  ></input>
                </form>
                <br/>
                <br/>
                <h1>Mis NFT's</h1>
              </div>
            </main>
          </div>
          <div className="row text-center">
            {this.state.colors.map((color,key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                <div className="token"
                style={{ backgroundColor: color }}></div>
                      <div>{color}</div>
                  </div>
                )
            })}
            </div>
          </div>
        </div>
    );
  }
}

export default App;
