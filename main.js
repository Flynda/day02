const express = require('express')
const handlebars = require('express-handlebars')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

const app = express()

app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

const rollDice = () => {
    let dice = Math.ceil(Math.random() * 6)
    switch (dice) {
        case 1:
            return  "dado-1.png"
            break;

        case 2:
            return  'roll2.png'
            break;

        case 3:
            return  'three_dots.png'
            break;

        case 4:
            return  'four.png'
            break;

        case 5:
            return  'Five-Image.png'
            break;
       
        case 6:
            return 'dice-showing-6.png'
            break;

        default:
            break;
    }
}

const roll = [
    {roll: rollDice()},
    {roll: rollDice()}
]

app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('roll', {
            newRoll: roll
        })
    }
)


app.use(
    express.static(__dirname + '/static')
)

app.use(
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.sendFile(__dirname + '/static/index.html')
    }
)

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})