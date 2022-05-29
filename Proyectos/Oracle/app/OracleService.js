// Llamada a las dependencias del proyecto
const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const fetch = require('node-fetch')

// Llamada a los archivos .json
const contractJson = require('../build/contracts/Oracle.json')

// Instancia de web3
const web3 = new Web3('ws://127.0.0.1:7545')

// Información de direcciones de Ganache
const addressContract = '0x7395a923b7c9aB7810C1b88877158E6a5c7e3dB7'

const contractInstance = new web3.eth.Contract(contractJson.abi, addressContract)
const address = '0xa46439673dDc16B2BA8DD5831324651fa2A67884'
const privateKey = Buffer.from('75f8a8ded140fdc7e2770bed43f1146c5c1c8876b977f6972ee4e37394fabca5', 'hex')

// Obtener el número de bloque
web3.eth.getBlockNumber()
    .then(n => listenEvent(n - 1))

// Función: listenEvent()
function listenEvent(lastBlock) {
    contractInstance.events.__callbackNewData({}, { fromBlock: lastBlock, toBlock: 'latest' }, (err, event) => {
        event ? updateData() : null
        err ? console.log(err) : null
    })
}

// Función: updateData()
function updateData() {
    // start_date = 2015-09-07
    // end_date = 2015-09-08
    // api_key = DEMO_KEY
    const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2000-09-07&end_date=2000-09-08&api_key=DEMO_KEY'

    fetch(url)
        .then(response => response.json())
        .then(json => setDataContract(json.element_count))
}

// Función: setDataContract(_value)
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
}