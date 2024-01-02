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

    //BLACK FLASH CODE
    if(interaction.commandName == 'black-flash-attempt'){
        //neccessary vars
        let number = Math.floor(Math.random() * 20);
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
            interaction.reply('```- failure... (wait 4 turns before trying again)-```');
            console.log(`${number} wasn't enough`);
        }
    }

    // DOMAIN EXPANSION CODE
    if(interaction.commandName == 'domain-expansion-attempt'){
        let number = Math.floor(Math.random() * 20);
        const previousSuccess = interaction.options.get('number-of-successful-attempts').value;

        //OUTER LOOP: if the user had no successful domains of any type
        if(interaction.options.get('highest-level').value == "none"){ 
            if(number == 19){//they get a complete DE
                interaction.reply('https://tenor.com/view/gojo-domain-expansion-gif-19197982');
            } else if(number == 17 || number == 18){//they get an incomplete DE
                interaction.reply('https://tenor.com/view/fushiguro-megumi-megumi-fushiguro-then-shadows-cursed-energy-megumi-gif-8946864940192553705');
            } else{ //they get no DE
                interaction.reply('```- failure... (wait until next fight to try again)-```');
            }

        //OUTER LOOP: if the user has performed a previous incomplete DE, but not a complete one
        } else if(interaction.options.get('highest-level').value == "incomplete domain"){//OUTER LOOP: if the user has performed a previous incomplete DE, but not a complete one
            if( previousSuccess <= 0 ){//if they fucked up on choosing
                interaction.reply('```choose "None" as your highest level.```');
            } else if(previousSuccess == 1 || previousSuccess == 2){ //if they've succeeded on 1 or 2 incomplete domains
                if(number >= 16 && number <= 19){//they get a complete DE
                    interaction.reply('https://tenor.com/view/gojo-domain-expansion-gif-19197982');
                } else if(number >= 9 && number <= 15){//they get an incomplete DE
                    interaction.reply('https://tenor.com/view/fushiguro-megumi-megumi-fushiguro-then-shadows-cursed-energy-megumi-gif-8946864940192553705');
                } else{ //they get no DE
                    interaction.reply('```- failure... (wait until next fight to try again)-```');
                }
            } else{ // 3 or more incomplete domains
                if(number >= 14 && number <= 19){//they get a complete DE
                    interaction.reply('https://tenor.com/view/gojo-domain-expansion-gif-19197982');
                } else if(number >= 0 || number <= 13){//they get an incomplete DE
                    interaction.reply('https://tenor.com/view/fushiguro-megumi-megumi-fushiguro-then-shadows-cursed-energy-megumi-gif-8946864940192553705');
                } else{ //they get no DE
                    interaction.reply('```- failure... (wait until next fight to try again)-```');
                }
            }

        //OUTER LOOP: if the user has completed a complete DE previously
        } else if(interaction.options.get('highest-level').value == "complete domain"){
            if( previousSuccess <= 0 ){//if they fucked up on choosing
                interaction.reply('```choose "None" or "Incomplete Domain" as your highest level.```');
            } else if(previousSuccess == 1 || previousSuccess == 2){ //if they've succeeded on 1 or 2 complete domains
                if(number >= 14 && number <= 19){//they get a complete DE
                    interaction.reply('https://tenor.com/view/gojo-domain-expansion-gif-19197982');
                } else if(number >= 0 && number <= 13){//they get an incomplete DE
                    interaction.reply('https://tenor.com/view/fushiguro-megumi-megumi-fushiguro-then-shadows-cursed-energy-megumi-gif-8946864940192553705');
                } else{ //they get no DE
                    interaction.reply('```- failure... - (how do you fail?)```');
                }
            } else{ // 3 or more complete domains
                //they get a complete DE
                interaction.reply('https://tenor.com/view/gojo-domain-expansion-gif-19197982');
                
            }

        //OUTER LOOP: for when i have no fucking clue how they messed up an required option.
        } else{
            interaction.reply('I have no clue what went wrong'); 
        }
        console.log(`${number + 1} is what they rolled for the DE attempt (-1 if u want the bot roll).`);
        return;
    }
})



client.login(process.env.TOKEN);