const fs = require("fs"); 

module.exports.run = async (client, message, args) => {

  // Define the role variables.
  let owner = "Luna";
  let admin = "Admin";
  let mod = "Moderator";

  // Define the mutee and muted role variables.
  let mutee = message.guild.member(message.mentions.members.first());
  let role = message.guild.roles.find("name", "Muted");

  // Limit it to admins.
  if(!message.member.roles.some(r => [owner, admin, mod].includes(r.name))) // If user doesn't have the Bot Owner or Admin role.
    return message.channel.send(":no_entry_sign:  |  You don't have enough permission to perform the .mute command!"); // Sends a message to the channel.

  // Get the member, return if there's none.
  if(!mutee)
    return message.channel.send(":interrobang:  |  You did not specify a valid member! \n:interrobang:  |  **Usage:** .mute [member]");

  // If the message author tries to mute themselves, send a warning.
  if(mutee.id === message.author.id)
    return message.channel.send(":no_entry_sign:  |  You cannot mute yourself!");

  // If the member has a higher role than the bot, send a warning.
  if(mutee.highestRole.position >= message.member.highestRole.position)
    return message.channel.send(":no_entry_sign:  |  You cannot mute a member who is higher than or has the same role as you.");

  // If the muted role doesn't exist, create one.
  if (!role) {
    try {

      // Basic role information.
      role = await message.guild.createRole({

        name: "Muted",
        color: "#556f6c",
        permissions: []

      });

      message.guild.channels.forEach(async (channel, id) => {

        // Role permissions.
        await channel.overwritePermissions(role, {

          SEND_MESSAGES: false,
          ADD_REACTIONS: false

        });

      });

    } catch(e) {

      console.log(e.stack);

    }
    
  }

  // If the member already has the muted role, send a warning message.
  if(mutee.roles.has(role.id))
    return message.channel.send(":warning:  |  This member is already muted!");

  // Mute the member.
  await mutee.addRole(role);
  message.channel.send(`:zap:  |  <@!` + mutee.user.id + `> has been muted by <@!` + message.author.id + `>.`);

}

module.exports.info = {

    // Set the command name.
    name: "mute"

}