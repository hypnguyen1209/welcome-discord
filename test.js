const WelcomeDiscord = require('./index')

let wel = new WelcomeDiscord()
wel.setAvatar('https://cdn.discordapp.com/avatars/699599273284730920/2f3104bf302dd49faa84812ee232b042.png?size=128')
.setCount(22)
.setUsername('ha')
.setDiscriminator('123123')
wel.build().then(console.log)