module.exports.run = async (client, message, args) => {

    // Define the role variables.
    let owner = "Luna";
    let admin = "Admin";
    let mod = "Moderator";

    // Limit it to admins.
    if (!message.member.roles.some(r => [owner, admin, mod].includes(r.name))) // If user doesn't have the Bot Owner or Admin role.
      return message.channel.send(":no_entry_sign:  |  You don't have enough permission to perform the .say command!"); // Send a message to the channel.

    // Get the message 
    const sayMessage = args.join(" ");

    // Delete the command message.
    message.delete()

    // Get the bot to say the message.
    message.channel.send(sayMessage);

}

module.exports.info = {

    // Set the command name.
    name: "say"

}