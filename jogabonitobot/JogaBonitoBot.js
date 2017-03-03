const _ = require('underscore');

let jugadores = 10;
let suplentes = 2;
let listado = [];

function addUser(user,fromId, invitador) {
	user = capitalizar(user);
	if(invitador) {
		invitador = capitalizar(invitador);
	}
	let exist = _.findWhere(listado, {user: user,cancha:fromId});
	let rta = "";

	if(jugadoresRestantes(fromId)>jugadores) {
		rta = user + " la lista esta completa!";	  
	} else  {
		if(exist) {
			if(invitador) {
				rta = user + " ya esta en la lista";
			} else {
				rta = user + ", ya estas en la lista";		
			}

		} else  {
			listado.push({user:user,cancha:fromId, invitador: invitador});  
			if(invitador) {
				rta = invitador+" invito a "+user;
			} else {
				rta = "Ok, "+user+", faltan: " +jugadoresRestantes(fromId);
			}
		}  
	}
  
	console.log(rta);
	return rta;
}

function jugadoresRestantes(fromId){
    let players = _.where(listado, {cancha:fromId});
	return (jugadores - _.size(players));
}

function reiniciarSemana()
{
	let msg ="";
	if (listado.length > 0){ 
		listado = [];
		msg = "La lista de jugadores ahora se encuentra VACIA.";
	}
	else{
		msg ="No hay jugadores en la lista actual.";
	}
	return msg;
}

function delUser(user,fromId, eliminador) {
  user = capitalizar(user);
  if(eliminador) {
	eliminador = capitalizar(eliminador);
  }

  let exist = _.findWhere(listado, {user: user,cancha:fromId});
  
  let rta = ""  
  if(exist) {
	let index = _.findIndex(listado, {user: user,cancha:fromId});
	listado.splice(index, 1);

	if(eliminador) {
		rta = eliminador + " quito a " +user + " de la lista de invitados";

	} else  {
		rta = "Ok, " +user + ", la pelota no se mancha! ahora faltan: "+jugadoresRestantes(fromId);;		
	}
  }	else {	  
	if(eliminador) {	
		rta = user+ ", no fue invitado ";
	} else {
		rta = user+ ", no estas en la lista ";
	}
  }	
	console.log(rta);
	return rta;
}

function formatearLista(fromId) {
	let lista = "";
	
    let players = _.where(listado, {cancha:fromId});
	
	_.each(players, function(obj,index){
		let num = index + 1;
		console.log(num, obj.user);
		
		lista += "("+num+") "+obj.user;
		if(obj.invitador) {
			lista += " (invitado)";			
		}
			
		lista += "\n";
	});
	
	if(lista=="") {
		lista = "No hay jugadores anotados.";
	}
	
	return lista;
}

function capitalizar(string) {
	string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	formatearLista: formatearLista,
	delUser: delUser,
	addUser: addUser,
	jugadoresRestantes: jugadoresRestantes,
	reiniciarSemana: reiniciarSemana
};