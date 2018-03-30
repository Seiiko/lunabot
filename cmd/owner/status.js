module.exports.run = async (client, message, args) => {

    // Define the role variable.
    let owner = "Luna";

    // Limit it to the bot owner.
    if (!message.member.roles.some(r => [owner].includes(r.name))) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign:  |  Only Sei can perform the .status command!"); // Send message to the channel.

    // Get the status. 
    let newStatus = args.join(" ");

    // Delete the command message.
    message.delete()

    // Change the bot's status.
    client.user.setPresence({ game: { name: newStatus, type: 0 } }); // Set the bot's status.

  }

module.exports.info = {

    // Set the command name.
    name: "status"

}