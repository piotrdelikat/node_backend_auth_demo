const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local',
    { session: false },
    (error, user) => {
      if (error || !user) {
        res.status(400).json({ error });
      }

      const payload = {
        username: user.username,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };

      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);

        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        res.status(200).send({ username: payload.username });
      });
    },
  )(req, res, next);
});

module.exports = router