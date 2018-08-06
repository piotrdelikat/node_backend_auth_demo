const express = require('express')
const router = express.Router()

const registrationRoute = require('./registrationRoute')
const loginRoute = require('./loginRoute')
const logoutRoute = require('./logoutRoute') 

router.use(function (err, req, res, next) {
    if (err) {
      console.log(err)
    }
  
    next()
  })

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send({
      status: 'OK',
    })
)

router.use('/register', registrationRoute)
router.use('/login', loginRoute)
router.use('/logout', logoutRoute)

module.exports = router