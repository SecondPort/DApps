const hello = artifacts.require("hello");
contract('hello', accuonts => {
    it("obtener mensaje", async() => {
        let instance = await hello.deployed();
        const message = await instance.getMessage.call({ from: accuonts[0] });
        assert.equal(message, "Hola mundo");
    });

    it("cambiar mensaje", async() => {
        let instance = await hello.deployed();
        const tx = await instance.setMessage("Hola mundo 2", { from: accuonts[2] });
        console.log(accuonts);
        console.log(accuonts[2]);
        console.log(tx);
        const message = await instance.getMessage.call();
        assert.equal(message, "Hola mundo 2");
    });
});