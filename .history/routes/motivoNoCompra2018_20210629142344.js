const express = require('express');
const Datos2018 = require('../models/Datos2018');
const ruta = express.Router();
ruta.get('/',(req,res)=>{
    let resultado = obtenerMotivoNoCompra2018();
    resultado.then(motivo2018 =>{
        res.json(motivo2018)
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
})
const obtenerMotivoNoCompra2018= async() => {
    try {
        const motivoNoCompraPrefieroVer2018 = await Datos2018.aggregate([
            {$match: {P10_A_Total_Prefiero_Ver_Lo_Que_Compro : 0}},
            {$group: {_id: null, count:{$sum:1}}}
        ])
        const motivoNoCompraMiedoEntregarInfPer2018 = await Datos2018.aggregate([
            {$match: {P10_A_Total_Miedo_Entregar_Informacion_Personal : 0}},
            {$group: {_id: null, count:{$sum:1}}}
        ])
        const motivoNoCompraDesconfianzaFormaDePago2018 = await Datos2018.aggregate([
            {$match: {P10_A_Total_Desconfianza_Forma_De_Pago : 0}},
            {$group: {_id: null, count:{$sum:1}}}
        ])
        const motivoNoCompraMiedoSerEstafadoEnganiado2018 = await Datos2018.aggregate([
            {$match: {P10_A_Total_Miedo_Ser_Estafado_Enganiado : 0}},
            {$group: {_id: null, count:{$sum:1}}}
        ])
        const motivoTotal = {
            PrefieroVerLoQueCompro : motivoNoCompraPrefieroVer[0].count,
            MiedoEntregarInfPer: motivoNoCompraMiedoEntregarInfPer[0].count,
            DesconfianzaFormaDePago: motivoNoCompraDesconfianzaFormaDePago[0].count,
            MiedoSerEstafadoEnganiado: motivoNoCompraMiedoSerEstafadoEnganiado[0].count
        }
        return motivoTotal

    } catch (error) {
        console.log(error)
    }
}
module.exports = ruta;