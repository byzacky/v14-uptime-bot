const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const victoriadb = require("croxydb")
const Discord = require("discord.js")
// WarsVisual : By Victoria
module.exports = {
    name: "uptime-set",
    description: "You will set the uptime system",
    type: 1,
    options: [
        {
            name: "channel",
            description: "You set the channel on which the Uptime system will be used.",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "premium-role",
            description: "Role where members can add more links.",
            type: 8,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🗑️")
                    .setLabel("Delete The System")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("sistemSıfırla")
            )

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Insufficient Permissons!")
            .setDescription("> You must have 'Adminstrstor' permissons to use this command!")

        const kanal = interaction.options.getChannel('channel')
        const role = interaction.options.getRole('premium-role')

        const ayarlandi = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Succesfully Setted!")
            .setDescription(`> **Uptime system channel is setted ${kanal}**!`)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [ayarlandi], components: [row1], ephemeral: true })

        victoriadb.set(`uptimeSistemi_${interaction.guild.id}`, { kanal: kanal.id, rol: rol.id })
    }

};
