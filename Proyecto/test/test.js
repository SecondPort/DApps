const hello = artifacts.require("hello");
contract('hello', accuonts => {
    it("obtener mensaje", async() => {
        let intance = await hello.deployed();
        const message = await intance.getMessage.call({ from: accuonts[0] });
        assert.equal(message, "Hola mundo");
    });

    it("cambiar mensaje", async() => {
        let intance = await hello.deployed();
        const tx = await intance.setMessage("Hola mundo 2", { from: accuonts[2] });
        console.log(accuonts);
        console.log(accuonts[2]);
        console.log(tx);
        const message = await intance.getMessage.call();
        assert.equal(message, "Hola mundo 2");
    });
    it("fullgas", async() => {
        let intance = await hello.deployed();
        const tx = await intance.fullgas({ from: accuonts[2] });
        const message = await intance.getMessage.call();
        assert.equal(tx, data);
    });
});