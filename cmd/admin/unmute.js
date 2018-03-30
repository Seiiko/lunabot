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

  // If the member already has the muted role, send a warning message.
  if(!role || !mutee.roles.has(role.id))
    return message.channel.send(":warning:  |  This member is not muted!");

  // Mute the member.
  await mutee.removeRole(role);
  message.channel.send(`:zap:  |  <@!` + mutee.user.id + `> has been unmuted by <@!` + message.author.id + `>.`)

}

module.exports.info = {

    // Set the command name.
    name: "unmute"

}