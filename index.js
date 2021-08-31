const Canvas = require('canvas')
const path = require('path')

Canvas.registerFont(path.resolve(__dirname + '/assets/font.ttf'), { family: 'Segoe Print' })

const readImage = (background = __dirname + '/assets/welcome.png') => {
    return new Promise(resolve => {
        require('fs').readFile(background, async (err, data) => {
            resolve(data)
        })
    })
}

const createImg = async (data, avatar, username, tag, num) => {
    const img = await Canvas.loadImage(data)
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    await ctx.drawImage(img, 0, 0, img.width, img.height)

    const avt = await Canvas.loadImage(avatar)
    const canvasAvt = Canvas.createCanvas(200, 200)
    const ctxAvt = canvasAvt.getContext('2d')
    ctxAvt.beginPath()
    ctxAvt.arc(100, 100, 99, 0, Math.PI * 2, true)
    ctxAvt.strokeStyle = '#2465D3'
    ctxAvt.stroke()
    ctxAvt.clip()
    ctxAvt.drawImage(avt, 0, 0, 200, 200)

    ctx.drawImage(canvasAvt, 32, 25, 200, 200)
    ctx.font = '30px Segoe Print'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText('Hello pạn nhỏ'.toString(), 250, 80)
    ctx.fillText(`${username}#${tag}`.toString(), 250, 130)
    ctx.font = '20px Segoe Print'
    ctx.fillText(`Bạn là người thứ ${num} của server!`.toString(), 250, 180)
    return canvas.toDataURL()
}

const draw = async (avatar, username, tag, num, background) => {
    let dataImage = await readImage(background)
    let draw = await createImg(dataImage, avatar, username, tag, num)
    return draw
}

class WelcomeDiscord {
    constructor() {
        this.avt = null
        this.background = __dirname + '/../assets/welcome.png'
        this.username = ''
        this.discriminator = '0000'
        this.count = 0
    }

    setAvatar(avt) {
        this.avt = avt
        return this
    }

    setUsername(username) {
        this.username = username
        return this
    }

    setDiscriminator(discriminator) {
        this.discriminator = discriminator
        return this
    }

    setCount(count) {
        this.count = count
        return this
    }
    
    async build() {
        let image = await draw(this.avt, this.username, this.discriminator, this.count)
        const buff = new Buffer.from(image.split(",")[1], 'base64')
        return buff
    }
}

module.exports = WelcomeDiscord