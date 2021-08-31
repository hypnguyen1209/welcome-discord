# welcome-discord

Install package:

```npm i welcome-discord```

Demo:

```javascript

const WelcomeDiscord = require('welcome-discord')

const Discord = require('discord.js')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        let imageLoad = new WelcomeDiscord()
        imageLoad.setAvatar( `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpg?size=256`)
        .setCount(member.guild.memberCount)
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        member.guild.channels.cache.get(`${channelIdWelcome}`).send(member.user.toString(), await imageLoad.build())
    })
}

```