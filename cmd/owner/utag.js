module.exports.run = async (client, message, args) => {

    // Define the role variable.
    let owner = "Luna";

    // Limit it to the bot owner.
    if (!message.member.roles.some(r => [owner].includes(r.name))) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign:  |  Only Sei can perform the .utag command!"); // Send message to the channel.

    // Get the user tag. 
    let newTag = args.join(" ");

    // Delete the command message.
    message.delete()

    // Change the bot's user tag.
    client.user.setUsername(newTag);

  }

module.exports.info = {

    // Set the command name.
    name: "utag"

}