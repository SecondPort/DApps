// SPDX-License-Identifier: MIT
pragma solidity >0.6.0;
pragma experimental ABIEncoderV2;

//declaraciones previas
contract notas{

    //direccion del profesor
    address public profesor;

    constructor()public{
        profesor = msg.sender;
    }

    //mapping para relacionar el hash de la identidad del alumno con su nota del examen
    mapping(bytes32 => uint) notas_alumnos;

    //mapping de los alumnos que pida revisiones de examen para una materia
    mapping(string=> string[]) revisiones;

    //eventos
    event alumno_evaluado(bytes32, uint);
    event evento_revision(string);

    //funcion para evaluar a alumnos
    function Evaluar(string memory _asignatura, string memory _idAlumno, uint _nota)public UnicamenteProfesor(msg.sender){
        bytes32 hashAlumno = keccak256(abi.encodePacked(_asignatura, _idAlumno));

        //relacion entre el hash de la identificacion del alumno y su nota
        notas_alumnos[hashAlumno] = _nota;

        //emision del evento
        emit alumno_evaluado(hashAlumno, _nota);
    }

    modifier UnicamenteProfesor(address _direccion){
        //requiere que la direccion introducida por el parametro sea igual al owner del contrato
        require(_direccion == profesor,"Solo el profesor puede realizar esta accion");
        _;
    }

    //funcion para ver las notas de un alumno
    function VerNotas(string memory _asignatura, string memory _idAlumno)public view returns(uint){
        bytes32 hashAlumno = keccak256(abi.encodePacked(_asignatura, _idAlumno));
        return notas_alumnos[hashAlumno];
    }

    //funcion para pedir revision de examen
    function Revision( string memory _asignatura, string memory _idAlumno)public{
        //almacenamiento de la identidad del alumno en un array
        revisiones[_asignatura].push(_idAlumno);
        //emitir el evento
        emit evento_revision(_idAlumno);

    }

    //funcion para ver revisiones de examen
    function VerRevisiones(string memory _asignatura)public view UnicamenteProfesor(msg.sender) returns(string[] memory){
        //devolver las identidades de los alumnos que han pedido revision
        return revisiones[_asignatura];
    }
}