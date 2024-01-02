require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
  {
    name: "black-flash-attempt",
    description: "rolls to see if a black flash was successful or not.",
    options: [{
      name: "previous-successes",
      description: "amount of black flashes this character has done before.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    }
  ]
  },
  {
    name: "domain-expansion-attempt",
    description: "rolls to see if a domain expansion is performed and which type it is.",
    options: [{
      name: "highest-level",
      description: "the highest level the OC has performed domain expansion.",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "none",
          value: "none",
        },
        {
          name: "incomplete domain",
          value: "incomplete domain",
        },
        {
          name: "complete domain",
          value: "complete domain",
        },
      ],
      required: true,
    },
    {
      name: "number-of-successful-attempts",
      description: "the amount of times the OC has successfully done said type.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();