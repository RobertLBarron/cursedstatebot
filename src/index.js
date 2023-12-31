require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
    let number = Math.floor(Math.random() * 21);
    if(message.content.toLowerCase() == 'black flash?'){
        message.reply('https://tenor.com/view/jujutsu-kaisen-itadori-yuuji-itadori-yuji-black-flash-jjk-gif-20447095')
    } //black flash gif
    if(message.content.toLowerCase() == 'braincorechipp'){
        message.reply('Its Brain! https://tenor.com/view/dancinganime-anime-dance-gif-21481797')
    } //brain secret
    if(message.content.toLocaleLowerCase() == 'black flash attempt'){
        if(number == 20){
            message.reply('```BLACK FLASH!!!```')
        } else{
            message.reply('```FAILURE!```')
            console.log(`${number} wasn't enough`);
        }
    }//og black flash implementation
    if(message.content.toLowerCase() == 'crayonfrog'){
        message.reply('https://tenor.com/view/funny-funny-frog-frog-frogs-oldweb-gif-25200328')
    } //brain secret
});

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isChatInputCommand()){
        return;
    } 

    let number = Math.floor(Math.random() * 20);

    if(interaction.commandName == 'black-flash-attempt'){
        //neccessary vars
        const previousSuccess = interaction.options.get('previous-successes').value;
        let targetNumber = 19;

        //edge cases and redeclaring
        if(previousSuccess < 0){
            targetNumber = 19;
        } else if(previousSuccess > 5){
            targetNumber = 14;
        } else{
            targetNumber = 19 - previousSuccess;
            console.log(`${previousSuccess} is the amount of previous succ`);
            console.log(`${targetNumber} is the target`);
        }

        // the checking between rolled and target number
        if(number >= targetNumber){
            interaction.reply('```BLACK FLASH!!!```');
            console.log(`${number} WAS enough`);
        } else{
            interaction.reply('```failure...```');
            console.log(`${number} wasn't enough`);
        }
    }
})



client.login(process.env.TOKEN);