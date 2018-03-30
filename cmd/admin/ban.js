module.exports.run = async (client, message, args) => {

    // Define the member and reason variables.
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(' ');

    // Define the role variables.
    let owner = "Luna";
    let admin = "Admin";
    let mod = "Moderator";

    // Limit it to admins.
    if (!message.member.roles.some(r => [owner, admin, mod].includes(r.name))) // If user doesn't have the Bot Owner or Admin role.
      return message.channel.send(":no_entry_sign:  |  You don't have enough permission to perform the .ban command!"); // Send a message to the channel.

    // Check if the member exists.
    if (!member)
      return message.channel.send(":interrobang:  |  This member doesn't exist! \n:interrobang:  |  **Usage:** .ban [member] [reason]"); // Send message to channel.

    // Check if the member has a higher role than the bot.  
    if (!member.bannable)
      return message.channel.send(":no_entry_sign:  |  I cannot ban this user!"); // Send message to channel.

    // Check if a reason was provided.
    if (!reason)
      return message.channel.send(":interrobang:  |  Please provide a valid reason for the ban. \n:interrobang:  |  **Usage:** .ban [member] [reason]"); // Send message to channel.

    // Ban the member.
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban because of : ${error}`));
    message.channel.send(`:zap:  |  <@!` + member.user.id + `> has been banned by <@!` + message.author.id + `>. \n:zap:  |  Reason: ${reason}`);

  }

module.exports.info = {

    // Set the command name.
    name: "ban"

}