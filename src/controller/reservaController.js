const Controller=require('./controller.js');
const ReservaServices=require('../services/ReservaServices.js');
const reservaServices=new ReservaServices();

class ReservaController extends Controller{
    constructor(){
        super(reservaServices);
    }
    async reservasStatus(req, res) {
        const situacao=req.params.status;
        try{
            const reservas=await reservaServices.reservaStatus(situacao);
            return res.status(200).json(reservas);
        }catch(erro){
            return res.status(500).json({error:erro.name, message:erro.message, model:'Reserva', method:'reservasStatus'});
        }
    }

    async verificaHorarioReservaExistente(req, res) {
        const {idSala, dataReservada}=req.params; 
        try {
            const response=await reservaServices.verificaHorarioReserva(idSala, dataReservada);
            return res.status(200).json(response);
        } catch (erro) {
            return res.status(500).json({error:erro.name, message:erro.message, model:'Reserva', method:'verificaHorarioReservaExistente'});
        }
    }

    async verificaDisponibilidade(req, res) {
        const {idSala, dataReservada, horaReservada}=req.params;
        try {
            const response=await reservaServices.verificaDisponibilidade(idSala, dataReservada, horaReservada);
            return res.status(200).json(response);
        } catch (erro) {
            return res.status(500).json({error:erro.name, message:erro.message, model:'Reserva', method:'verificaDisponibilidade'});
        }
    }
    
    async cria(req, res){
        const novoRegistro = req.body;
        try{
            const novoRegistroCriado = await reservaServices.criaRegistro(novoRegistro);
            return res.status(200).json(novoRegistroCriado);
        }catch(erro){
            return res.status(500).json({error:erro.name, message:erro.message, model:'Reserva', method:'cria'});
        }
    }
}

module.exports=ReservaController;