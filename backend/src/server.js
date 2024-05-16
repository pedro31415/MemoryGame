const app = require("./app")
const dotenv = require("dotenv")
const userRouter =  require("./router")

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
   console.log(`server is running or port ${PORT}`)
})
