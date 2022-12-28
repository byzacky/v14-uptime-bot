const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")
const Discord = require("discord.js")
// Lourity
module.exports = {
    name: "uptime-ayarla",
    description: "Uptime sistemini ayarlarsınız",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Uptime sisteminin kullanılacağı kanalı ayarlarsınız.",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "özel-rol",
            description: "Üyelerin daha fazla link ekleyebileceği rol.",
            type: 8,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🗑️")
                    .setLabel("Sistemi Sıfırla")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("sistemSıfırla")
            )

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        const kanal = interaction.options.getChannel('kanal')
        const rol = interaction.options.getRole('özel-rol')

        const ayarlandi = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Başarıyla Ayarlandı!")
            .setDescription(`Uptime sistemi başarıyla ${kanal} olarak **ayarlandı**!`)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [ayarlandi], components: [row1], ephemeral: true })

        louritydb.set(`uptimeSistemi_${interaction.guild.id}`, { kanal: kanal.id, rol: rol.id })
    }

};
