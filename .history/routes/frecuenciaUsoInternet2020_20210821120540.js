const express = require('express');
const Datos2020 = require('../models/Datos2020');
const ruta = express.Router();
ruta.get('/',(req,res)=>{
    let resultado2020 = obtenerFrecuenciaUsoInternet2020();
    resultado2020.then(frecuencia2020 =>{
        res.json(frecuencia2020)
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
})

const obtenerFrecuenciaUsoInternet2020 = async () => {
    try {const frecuenciaTodosLosDias2020 = await Datos2020.aggregate([
        { $match : { "P9_Frecuencia_Uso_Internet": "1" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] )
    const frecuenciaCadaDosDias2020 = await Datos2020.aggregate([
        { $match : { "P9_Frecuencia_Uso_Internet": "2"} },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] )
    const frecuenciaCadaTresDias2020 = await Datos2020.aggregate([
        { $match : { "P9_Frecuencia_Uso_Internet": "3" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] )
    const frecuenciaCadaCuatroDias2020 = await Datos2020.aggregate([
        { $match : { "P9_Frecuencia_Uso_Internet": "4" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] )
    const frecuenciaCadaCincoDias2020 = await Datos2020.aggregate([
        { $match : { "P9_Frecuencia_Uso_Internet": "5"} },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] )
     //Tamaño del objeto
     const tamanioObjeto = BSON.calculateObjectSize(Multiple.aggregate([
        { $match : { "P9_Frec_Int ": 1} },
        { $group: { _id: null, count: { $sum: 1 } } }
    ] ))
    
    const frecuenciaTotal = { 
        TodosLosDias : frecuenciaTodosLosDias2020[0].count,
        CadaDosDias : frecuenciaCadaDosDias2020[0].count,
        CadaTresDias : frecuenciaCadaTresDias2020[0].count,
        CadaCuatroDias : frecuenciaCadaCuatroDias2020[0].count,
        CadaCincoDias : frecuenciaCadaCincoDias2020[0].count               
    }
    
    return frecuenciaTotal  
    } catch (error) {
        console.log(error)
    }
}

module.exports = ruta;