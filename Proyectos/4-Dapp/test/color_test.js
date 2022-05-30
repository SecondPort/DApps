const {assert} = require('chai');//sirve para usar should.be.*
const Color = artifacts.require("Color");
var Web3 = require('web3');
const BN = require('bn.js');

require('chai').use(require('chai-as-promised')).should();//sirve para usar should.be.*

contract("Color", (accounts )=> {
    let contract;

    //antes de cada test se hace el deploy del contrato
    before (async()=>{
        contract = await Color.deployed();
    });

    //test deploy
    describe("Deployment", async ()=>{
        it("Deploy Exitoso", async ()=>{
            const address = await contract.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it("Nombre", async ()=>{
            const name = await contract.name();
            assert.equal(name, "Color");
        });
        it("Owner", async ()=>{
            const owner = await contract.owner();
            assert.equal(owner, accounts[0]);
        });
    });

    //test minting
    describe("Minting", async ()=>{
        it("minting", async()=>{
            const result = await contract.safeMint("#FFFFFF");
            const result1 = await contract.safeMint("#FFFFF1");
            const min3 = await contract.safeMint("#FFFFF2");
            const totalSupply = await contract.totalSupply();
            //debe pasar
            assert.equal(totalSupply, 3);
            const event = result.logs[0].args;
            const event1 = result1.logs[0].args;
            const event3 = min3.logs[0].args;
            console.log(event);
            console.log(event1);
            console.log(event3);
            assert.equal(event.from, "0x0000000000000000000000000000000000000000", 'direccion correcto');
            assert.equal(event.to, accounts[0], 'direccion correcto');

            let id = event.tokenId
            console.log("------------------------------------ BIG NUMBER")
            console.log(BN(id));
            assert.equal(BN(id), 0,'id correcto');

            console.log("------------------------------------ BIG NUMBER ID 1")
            let id1 = event1.tokenId;
            assert.equal(BN(id1), 1,'id correcto');
            console.log(BN(id1));

            //no exitoso
            await contract.safeMint("#FFFFFF").should.be.rejected;
        });
    });
    //indexing
    describe("Indexing", async ()=>{
        it("lista colores", async()=>{
            await contract.safeMint("#000000");
            await contract.safeMint("#FFF000");
            await contract.safeMint("#FF0000");
            const totalSupply = await contract.totalSupply();

            let color;
            let result = [];

            for (let i = 1; i <= totalSupply; i++) {
                color = await contract.colors(i-1);
                result.push(color);
            }

            let expected = ["#FFFFFF","#FFFFF1","#FFFFF2","#000000", "#FFF000", "#FF0000"];
            assert.equal(result.join(","), expected.join(","));
        });
    });

});

/*
const Color = artifacts.require("Color");

contract("Color", accounts =>{
    it("deploy and get color", async() => {
        let instance = await Color.deployed();
        const mint = await instance.safeMint("rojo", { from: accounts[0] });
        console.log("Cunetas")
        console.log(accounts[0]);
        console.log("Mint")
        console.log(mint)
    })
}) */