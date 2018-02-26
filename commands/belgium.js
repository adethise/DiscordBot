const Discord = require('discord.js')

const description = 'Show that Belgium is relevant.';
const syntax = '(command) [adjectives]';

module.exports = class Belgium extends require('./command') {
/*
 * This module will send an image of Belgiumball with a message 'Belgium is ...'.
 * The adjective can be customized by passing it as an option, default is 'relevant'.
 *
 * Syntax:
 * 	(command) [adjectives...]
 * 	ex.: >belgium stronk
 */
	static action(message) {
		var end_cmd = message.content.indexOf(' ');
		var adjectives;
		if (end_cmd == -1) {
			adjectives = "relevant";
		} else {
			adjectives = message.content.substr(end_cmd + 1);
		}

		message.channel.send(
			'Belgium is ' + adjectives + ' !',
			new Discord.Attachment('./images/belgiumball.jpg')
		);
	}
}
