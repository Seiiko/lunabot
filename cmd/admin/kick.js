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
      return message.channel.send(":no_entry_sign:  |  You don't have enough permission to perform the .kick command!"); // Send message to the channel.

    // Check if the member exists.
    if (!member)
      return message.channel.send(":interrobang:  |  This member doesn't exist! \n:interrobang:  |  **Usage:** .kick [member] [reason]"); // Send message to channel.

    // Check if the member has a higher role than the bot.
    if (!member.kickable)
      return message.channel.send(":no_entry_sign:  |  I cannot kick this user!"); // Send message to channel.

    // Check if a reason was provided.
    if (!reason)
      return message.channel.send(":interrobang:  |  Please provide a valid reason for the kick. \n:question:  |  **Usage:** .kick [member] [reason]"); // Send message to channel.

    // Kick the member.
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send(`:zap:  |  <@!` + member.user.id + `> has been kicked by <@!` + message.author.id + `>. \n:zap:  |  Reason: ${reason}`);

  }

module.exports.info = {

    // Set the command name.
    name: "kick"

}