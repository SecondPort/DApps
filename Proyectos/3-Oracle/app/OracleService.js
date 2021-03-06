// Llamada a las dependencias del proyecto
const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const fetch = require('node-fetch')

// Llamada a los archivos .json
const contractJson = require('../build/contracts/Poker.json')

// Instancia de web3
const web3 = new Web3('ws://127.0.0.1:8545')

// Información de direcciones de Ganache
const addressContract = '0xB96F6409e217B0D682fc63c9Dc7326a183CB31fc'

const contractInstance = new web3.eth.Contract(contractJson.abi, addressContract)
const address = '0x9Fd8635172977E3b51B066CD03257A8a55d7B078'
const privateKey = Buffer.from('71619680b89f208c519f2c671d522e8dff95e5f48fdde249d7ddc3d2348b120e', 'hex')

// Obtener el número de bloque
web3.eth.getBlockNumber()
    .then(n => listenEvent(n - 1))

// Función: listenEvent()
function listenEvent(lastBlock) {
    contractInstance.events.Transfer({}, { fromBlock: lastBlock, toBlock: 'latest' }, (err, event) => {
        event ? updateData() : null
        err ? console.log(err) : null
    })
}

//function to listen event in the contract
/* function listenEvent(lastBlock) {
    contractInstance.events.Transfer({}, { fromBlock: lastBlock, toBlock: 'latest' }, (err, event) => {
        event ? updateData() : null
 */

// Función: updateData()
function updateData() {
    // start_date = 2015-09-07
    // end_date = 2015-09-08
    // api_key = DEMO_KEY
    const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2010-09-07&end_date=2010-09-08&api_key=DEMO_KEY'

    fetch(url)
        .then(response => response.json())
        .then(json => setDataContract(json.element_count))
}

/* // Función: setDataContract(_value)
function setDataContract(_value) {
    web3.eth.getTransactionCount(address, (err, txNum) => {
        contractInstance.methods.setNumberAsteroids(_value).estimateGas({}, (err, gasAmount) => {
            let rawTx = {
                nonce: web3.utils.toHex(txNum),
                gasPrice: web3.utils.toHex(web3.utils.toWei('1.4', 'gwei')),
                gasLimit: web3.utils.toHex(gasAmount),
                to: addressContract,
                value: '0x00',
                data: contractInstance.methods.setNumberAsteroids(_value).encodeABI()
            }

            const tx = new Tx(rawTx)
            tx.sign(privateKey)
            const serializedTx = tx.serialize().toString('hex')
            web3.eth.sendSignedTransaction('0x' + serializedTx)
        })
    })
} */

function setDataContract(_value) {
    web3.eth.getTransactionCount(address, (err, txNum) => {
        contractInstance.methods.mint(address, _value).estimateGas({}, (err, gasAmount) => {
            let rawTx = {
                nonce: web3.utils.toHex(txNum),
                gasPrice: web3.utils.toHex(web3.utils.toWei('1.4', 'gwei')),
                gasLimit: web3.utils.toHex(gasAmount),
                to: addressContract,
                value: '0x00',
                data: contractInstance.methods.mint(address, _value).encodeABI()
            }

            const tx = new Tx(rawTx)
            tx.sign(privateKey)
            const serializedTx = tx.serialize().toString('hex')
            web3.eth.sendSignedTransaction('0x' + serializedTx)
        })
    })
}