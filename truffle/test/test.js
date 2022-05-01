//llamada al contrato
const notas = artifacts.require("notas");

contract("notas", accuonts => {
    it("Evaluar", async() => {
        //contrato desplegado
        let instance = await notas.deployed();
        //llamada a la funcion
        const tx = await instance.Evaluar("lengua", "lucas",
            9, { from: accuonts[0] });
        //imprimir valores
        console.log(accuonts[0]);
        console.log(tx);
        //comprobacion de valores
        const nota_alumno = await instance.VerNotas.call("lengua", "lucas", { from: accuonts[1] });
        assert.equal(nota_alumno, 9);
    });
    it("Revision", async() => {
        let instance = await notas.deployed();
        const revision = await instance.Revision("lengua", "lucas", { from: accuonts[1] });
        const revision1 = await instance.Revision("biologia", "pepe", { from: accuonts[2] });
        console.log(revision);
        console.log(revision1);
        const verRevision = await instance.VerRevisiones.call("lengua", { from: accuonts[0] });
        const verRevision1 = await instance.VerRevisiones.call("biologia", { from: accuonts[0] });
        console.log(verRevision);
        assert.equal(verRevision[0], "lucas", );
        assert.equal(verRevision1[0], "pepe", );
    });
});