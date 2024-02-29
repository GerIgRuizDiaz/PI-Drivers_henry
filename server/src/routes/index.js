const { Router } = require("express");
const routes = require('./routs')

const router = Router();

router.use("/", routes)


module.exports = router;
