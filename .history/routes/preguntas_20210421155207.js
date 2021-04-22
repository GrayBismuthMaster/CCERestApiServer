const express = require('express');
const Multiple = require('../models/Multiple');
const Datos2018 = require('../models/Datos2018')
const Datos
const ruta = express.Router();
ruta.get('/',(req,res)=>{
    let resultado = listarPreguntas();
    resultado.then(preguntas =>{
        res.json(preguntas)
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
})
const listarPreguntas = async ()=>{
    let preguntas = await Multiple.find({});
    return preguntas;
}
const listarPreguntas2018 = async() => {
    let preguntas2018 = await Datos2018.find({});
    return preguntas2018;
}
/*
ruta.post('/',(req,res)=>{
    let body = req.body;
    let resultado = agregarPreguntas(body);
    resultado.then(user=>{
        res.json({
            valor:user
        })
    })
})
*/
module.exports = ruta;