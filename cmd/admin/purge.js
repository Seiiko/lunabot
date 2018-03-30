module.exports.run = async (client, message, args) => {

    // Define the role variables.
    let owner = "Luna";
    let admin = "Admin";
    let mod = "Moderator";
        
    async function purge() { // Wrap in an async.

        // Limit it to admins.
        if (!message.member.roles.some(r => [owner, admin, mod].includes(r.name))) // If user doesn't have the Bot Owner or Admin role.
        return message.channel.send(":no_entry_sign:  |  You don't have enough permission to perform the .purge command!"); // Send a message to the channel.
                    
        // Verify if the variable is a number.
        if (isNaN(args[0]))
        return message.channel.send(":interrobang:  |  Please specify how many messages you want deleted.\n:interrobang:  |  **Usage:** .purge [number of messages]"); // Send a message to the channel.

        // Get the number of messages to be deleted.  
        const fetched = await message.channel.fetchMessages({limit: args[0]});

        // Delete the command message.
        message.delete();
                
        // Delete the messages.
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(":interrobang:  |  Please provide a number between 2 and 100.\n:interrobang:  |  **Usage:** .purge [number of messages]")); // In case of error, post it in the channel.

    }
             
    //Calling the function.
    purge();

}

module.exports.info = {

    // Set the command name.
    name: "purge"

    }