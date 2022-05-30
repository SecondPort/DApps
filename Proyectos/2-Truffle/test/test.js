//llamada al contrato
const notas = artifacts.require("notas");

contract("notas", accuonts => {
    it("Evaluar", async() => {
        //contrato desplegado
        let instance = await notas.deployed();
        //llamada a la funcion
        const tx = await instance.Evaluar("lucas", 9,
            "Lengua", { from: accuonts[0] });
        //imprimir valores
        console.log(accuonts[0]);
        console.log(tx);
        //comprobacion de valores
        const nota_alumno = await instance.VerNotas.call("lucas", "Lengua", { from: accuonts[1] });
        assert.equal(nota_alumno, 9);
    });
    it("Revision", async() => {
        let instance = await notas.deployed();
        const revision = await instance.Revision("lucas", "Lengua", { from: accuonts[1] });
        const revision1 = await instance.Revision("pepe", "Biologia", { from: accuonts[2] });
        console.log(revision);
        console.log(revision1);
        const verRevision = await instance.VerRevisiones.call("Lengua", { from: accuonts[0] });
        const verRevision1 = await instance.VerRevisiones.call("Biologia", { from: accuonts[0] });
        console.log(verRevision);
        assert.equal(verRevision[0], "lucas", );
        assert.equal(verRevision1[0], "pepe", );
    });
});