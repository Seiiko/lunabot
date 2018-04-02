// SETUP THE BOT
const Discord = require('discord.js');
const client = new Discord.Client();

// SETUP THE DEPENDENCIES
const fs = require("fs"); // File system dependency.
const ytdl = require("ytdl-core"); // YouTube core dependency.
const Music = require('discord.js-musicbot-addon'); // Music bot dependency.

// DEFINE THE PREFIX
const prefix = ".";

// CREATE THE SPAM COLLECTIONS
const talkedRecently = new Set();
const talkedRecently1 = new Set(); 
const talkedRecently2 = new Set(); 
const talkedRecently3 = new Set(); 

// SETUP THE COMMANDS COLLECTION
client.commands = new Discord.Collection();

// READ THE ADMIN COMMANDS FOLDER
fs.readdir("./cmd/admin", (err, files) => {
  if(err) console.error(err);

  // Filter .js files.
  let jsFiles = files.filter( f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No commands to load.");
    return;
  }

  // Load the commands
  console.log(`Loading ${jsFiles.length} admin commands.`);
  jsFiles.forEach((f, i) => {

    let props = require(`./cmd/admin/${f}`);
    console.log(`${i + 1}: ${f} loaded.`);
    client.commands.set(props.info.name, props);

  });

});

// READ THE BOT OWNER COMMANDS FOLDER
fs.readdir("./cmd/owner", (err, files) => {
  if(err) console.error(err);

  // Filter .js files.
  let jsFiles = files.filter( f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No commands to load.");
    return;
  }

  // Load the commands
  console.log(`Loading ${jsFiles.length} bot owner commands.`);
  jsFiles.forEach((f, i) => {

    let props = require(`./cmd/owner/${f}`);
    console.log(`${i + 1}: ${f} loaded.`);
    client.commands.set(props.info.name, props);

  });

});

// SET UP THE MUSIC CLIENT.
const music = new Music(client, {
  
  youtubeKey: 'AIzaSyCom6F7OFxjJYHDNv6w_3Y2fP3CrTan9JU',
  prefix: '.',
  helpCmd: 'mhelp',
  messageHelp: true,
  botOwner: '380484645281595392',
  ownerOverMember: true,
  enableQueueStat: true,
  logging: true

});

// SET BOT STATUS
client.on('ready', () => { // When the bot is ready.
    client.user.setPresence({ game: { name: 'Project Luna', type: 0 } }); // Set the bot's status.
});
    
// WELCOME NEW MEMBERS
client.on("guildMemberAdd", member => { // Listener event: user joining the server.
    
  // Defining the variables.
  const welcomeChannel = client.channels.find("name", "general-chat") // Create a variable referring to the selected channel.

  // Sending the messages.
  welcomeChannel.send("<@!"+member.user.id+">  |  **Welcome to the Starshine Beacon Community Server!**\nWe hope you will be having a nice time here. Before you start chatting, we would like you to check out the #information channel!");
  member.send("*Welcome to the Starshine Beacon Community Server!**\nWe hope you will be having a nice time here.");
    
});

// COMMAND HANDLER
client.on("message", async message => {

   // Ignore other bots, including itself.
   if(message.author.bot) return;
  
   // Ignore messages without prefix.
   if(message.content.indexOf(prefix) !== 0) return;

   // Separate the "command" name, and our "arguments" for the command.
   let raw = message.content.split(/ +/g);
   let command = raw[0];
   let args = raw.slice(1);

   // Define the command variable.
   var cmd = client.commands.get(command.slice(prefix.length));

   // Check if the command exists.
   if (cmd)
    cmd.run(client, message, args);

});


// SPAM PREVENTION
client.on("message", async message => {

  // Ignore other bots, including itself.
  if(message.author.bot) return;

 // Spam prevention.
 if (talkedRecently.has(message.author.id)) {

   talkedRecently.delete(message.author.id);
   talkedRecently1.add(message.author.id); setTimeout(() => { 
   talkedRecently1.delete(message.author.id); }, 2500);

 } else if (talkedRecently1.has(message.author.id)) {

   talkedRecently1.delete(message.author.id);
   talkedRecently2.add(message.author.id); setTimeout(() => { 
   talkedRecently2.delete(message.author.id); }, 2500);

 } else if (talkedRecently2.has(message.author.id)) {

   talkedRecently2.delete(message.author.id);
   talkedRecently3.add(message.author.id); setTimeout(() => { 
   talkedRecently3.delete(message.author.id); }, 5000);

 } else if (talkedRecently3.has(message.author.id)) {

   talkedRecently2.delete(message.author.id);
   message.channel.send(":no_mouth:  |  Whoa there, cowboy. Slow down! You can type again in 5 seconds.");
   message.member.addRole(message.guild.roles.find("name", "★ Muted ★"));

   function callback(){
    return function(){
      message.member.removeRole(message.guild.roles.find("name", "★ Muted ★"));
      }
   }

   setTimeout(callback(), 5000);
   return;

 } else {

   // Add the member to the set so that they can't talk for 2.5 seconds.
   talkedRecently.add(message.author.id); setTimeout(() => { 
   talkedRecently.delete(message.author.id); }, 2500);

 }

});

// GET THE BOT'S TOKEN, DON'T CHANGE
client.login(process.env.BOT_TOKEN);