const _ = require('underscore');
const futbolhero = require('./JogaBonitoBot');
const TeleBot = require('telebot');
const bot = new TeleBot('333576962:AAEg6XnIhsO_3ZTc6KFipZLnzhpp2FmFcjQ');

bot.on('/lista', msg => {
	let fromId = msg.from.id;

	let rta = futbolhero.formatearLista(fromId);
	return bot.sendMessage(fromId, rta);
});

bot.on('/voy', msg => {
	let fromId = msg.from.id;
	let user = msg.from.first_name;

	console.log(msg.from);

	let rta = futbolhero.addUser(user,fromId);  
	return bot.sendMessage(fromId, rta);
});

bot.on('/novoy', msg => {
	let fromId = msg.from.id;
	let user = msg.from.first_name;

	let rta = futbolhero.delUser(user,fromId);
	return bot.sendMessage(fromId, rta);
});

bot.on('/invitar', msg => {
	let fromId = msg.from.id;
	let user = msg.from.first_name;
	let invitados = msg.text.split(' ');
	invitados.splice(0, 1);
  
	_.each(invitados, function(invitado,index){
		let rta = futbolhero.addUser(invitado,fromId,user);  
		return bot.sendMessage(fromId, rta);
	});
});

bot.on('/nova', msg => {
	let fromId = msg.from.id;
	let user = msg.from.first_name;
	let invitados = msg.text.split(' ');
	invitados.splice(0, 1);
  
	_.each(invitados, function(invitado,index){
		let rta = futbolhero.delUser(invitado,fromId,user);  
		return bot.sendMessage(fromId, rta);
	});
});

console.log("Wait...");
bot.connect();
