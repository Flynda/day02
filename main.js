const express = require('express')
const handlebars = require('express-handlebars')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

const app = express()

app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('roll', {
            rollOne: rollDice(),
            rollTwo: rollDice()
        })
    }
)

const rollDice = () => {
    let dice = Math.ceil(Math.random() * 6)
    switch (dice) {
        case 1:
            return `<img src="../images/dado-1.png" alt="one">`
            break;
    
        case 2:
            return `<img src="../images/roll2.png" alt="two">`
            break;
        
        case 3:
            return `<img src="../images/three_dots.png" alt="three">`
            break;
        
        case 4:
            return `<img src="../images/four.png" alt="four">`
            break;
        
        case 5:
            return `<img src="../images/Five-Image.png" alt="five">`
            break;

        case 6:
            return `<img src="../images/dice-showing-6.png" alt="six">`
            break;

        default:
            break;
    }
}




app.use(express.static(__dirname + '/dice-images'))

app.use(
    (req, resp) => {
        resp.status(200)
        resp.type('text.html')
        resp.render(__dirname + '/views/index.hbs')
    }
)

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})