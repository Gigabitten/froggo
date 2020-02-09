const Discord = require('discord.js');
const client = new Discord.Client();
const prefixes = ['.','!','?',',',':',';','`'];
const descriptions = ['Most any command prefix will work.'
		      , 'help - hopefully you figured this one out.'
		      , 'ping - for if you want to check that the bot works.'
		      , 'owo - an especially egregious owoizer.'
		      , 'github - Gigabitten/froggo if you don\'t care about the details.'
		     ];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ game: { name: "frogger || .help" }});
});

client.on('message', msg => {
    trigger = msg.content;
    trigger = parse(trigger);
    author = msg.author;
    const chan = msg.guild.channels.find(ch => ch.name === 'general');
    if(prefixes.includes(trigger.charAt(0)) && !author.bot) {
	processed = trigger.substr(1).split(' ');
	if(processed[0] === 'ping') ping(author, chan);
	else if(processed[0] === 'help') help(chan);
	else if(processed[0] === 'github') git(chan);
	else if(processed[0] === 'owo') owo(processed, chan);
	else chan.send("Sorry, I don't recognize that command!");
    }
});

function owo(words, chan) {
    if(words.length > 0) {
	delete words[0];
	chan.send(owohelp(words.join(" ")));
    }
    else chan.send("You need to put something after the command, silly!");
}

function owohelp(nowo) {
    if(nowo.length > 0) return owochar(nowo.charAt(0)) + owohelp(nowo.substr(1));
    else return "";
    // *notices recursion* senpai what's this? uwu    
}

function owochar(c) {
    if(c === 'r') return 'w';
    if(c === 'o') return 'owo';
    if(c === 'u') return 'uwu';
    else return c;
}

function git(chan) {
    chan.send('This project is open source and licensed under the GPL! You can find the repo here: https://github.com/Gigabitten/froggo');
}

function ping(user, chan) {
    chan.send(`${author.username} is the big gay.`);
}

function help(chan) {
    chan.send(descriptions.join("\n"));
}

function parse(trigger) {
    trigger = trigger.toLowerCase();
    return trigger;
}

client.login('YOUR_TOKEN_GOES_HERE')
