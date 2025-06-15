const express = require('express');
const Message = require('../models/Message');
const authenticateJWT = require('../middleware/auth');
const { messageValidationSchema } = require('../validation/schemas');
const rateLimit = require('express-rate-limit');


module.exports = (io) => {
  const router = express.Router();

  // Rate limiter: max 5 messages per 10 seconds per IP
  const messageRateLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5,              // limit each IP to 5 requests per window
    message: { error: 'Too many messages, please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
  });


  // POST /messages
  router.post('/', authenticateJWT, messageRateLimiter, async (req, res) => {
    const { username, message } = req.body;

    const { error } = messageValidationSchema.validate({ username, message });
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (username !== req.user.username) {
      return res.status(403).json({ error: 'Username mismatch' });
    }

    const timestamp = new Date();
    const msgObj = { username, message, timestamp };

    try {
      await new Message(msgObj).save();
      io.emit('new_message', msgObj);
      res.json({ success: true, message: 'Message sent.' });
    } catch (err) {
      res.status(500).json({ error: 'Message saving failed.' });
    }
  });

  // GET /messages
  router.get('/', async (req, res) => {
    let limit = Math.min(parseInt(req.query.limit) || 50, 50);

    try {
      const messages = await Message.find().sort({ timestamp: -1 }).limit(limit).lean();
      res.json(messages.reverse()); // Newest last
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  return router;
};
