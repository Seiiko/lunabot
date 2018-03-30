module.exports.run = async (client, message, args) => {

    // Define the role variable.
    let owner = "★ Nova ★";

    // Limit it to the bot owner.
    if (!message.member.roles.some(r => [owner].includes(r.name))) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign:  |  Only Sei can perform the .avatar command!"); // Send message to the channel.

    // Get the avatar. 
    let newAvatar = args.join(" ");

    // Delete the command message.
    message.delete()

    // Change the bot's avatar.
    message.guild.members.get(client.user.id).setAvatar(newAvatar);

  }

module.exports.info = {

    // Set the command name.
    name: "bavatar"

}