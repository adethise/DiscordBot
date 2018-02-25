const snoowrap = require('snoowrap');
const auth = require('../auth.json');

const reddit = new snoowrap({
	userAgent: 'Discord Bot (by /u/Bainos) 0.0.1',
	clientId: auth.reddit.clientId,
	clientSecret: auth.reddit.clientSecret,
	username: auth.reddit.username,
	password: auth.reddit.password
});


/* Unfortunately ES6 doesn't allow to export those easily. */
const description = 'Post a picture from reddit.';
const syntax =  '(command) <subreddit> [--hot|--top|--new] [--first]';

module.exports = class Image extends require('./command') {
/*
 * This module implements the command to get images from Reddit and post them.
 *
 * Syntax:
 * 	(command) <subreddit> [--hot|--top|--new] [--first]
 * 	ex.: >image wholesomeyuri --top
 *
 * 	Options:
 * 	--hot|--top|--new: which sorting to use
 * 	--first: only return the first result (otherwise select randomly among first 25 results)
 *
 */
	static action(message) {
		// Drop the first arg (command name)
		var args = message.content.split(' ');
		args.shift();

		// Store the request parameters
		var subredditName;
		var options = {
			sort: 'hot',
			first: false
		};

		// Parse parameters
		for (var i in args) {
			var arg = args[i];
			if (arg.startsWith('--')) {
				// arg is a flag
				var err = parseOption(arg.replace('--', ''), options);
				if (err) {
					message.reply(err);
				}
			} else if (subredditName == undefined) {
				// arg is a subreddit
				subredditName = arg.replace('/r/', '');
			} else {
				// arg is a subreddit, but already defined !
				message.reply('Error: multiple <subreddit> arguments');
			}
		}

		if (subredditName == undefined) {
			message.reply('Error: no subreddit provided! (Try awwnime)');
		}

		// At this point, we assume the comment was well-formatted ; perform request
		var subreddit = reddit.getSubreddit(subredditName);
		if (options.sort == 'hot') {
			subreddit.getHot().then(function(results) {
				postReply(results, message, options);
			})
		} else if (options.sort == 'top') {
			subreddit.getTop({time: 'all'}).then(function(results) {
				postReply(results, message, options);
			})
		} else if (options.sort == 'new') {
			subreddit.getNew().then(function(results) {
				postReply(results, message, options);
			})
		}
	}
}

parseOption = function(arg, options) {
/*
 * Parse command options.
 *
 * Returns false on success, else an error message.
 */
	if (arg == 'hot' || arg == 'top' || arg == 'new') {
		options.sort = arg;
	} else if (arg == 'first') {
		options.first = true;
	} else {
		return 'Error: unrecognized flag: ' + arg;
	}
	return false;
}

postReply = function(results, message, options) {
/*
 * Post a result.
 * And this is the point where I gave up on doing clean code in JS.
 */
	var index;
	if (options.first) index = 0;
	else index = Math.floor(25 * Math.random());

	var post = results[index];
	message.channel.send(post.title + " " + post.url);
}
