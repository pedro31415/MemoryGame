const express = require("express")
const router = express.Router()
const UserController = require("./controller/userController")

router.get("/", (req,res) => {
    res.status(200).send("o router está funcionando")
})


router.post('/usuarios', UserController.createUser)
router.get("/usuarios", UserController.getAllUsers)
router.get("/usuarios/:id", UserController.getOneUser)
router.delete("/usuarios/:id", UserController.deleteUserById)

module.exports = router