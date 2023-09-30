const app = require("./app")
const database = require("./database/database.js")

database()

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER STARTED AT PORT: ${process.env.PORT} - ${process.env.NODE_ENV} MODE`)
})