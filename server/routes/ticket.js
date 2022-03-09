const { Router } = require('express');
const router = Router();
const Ticket = require('../model/ticket');
const { adminAuthMiddleware } = require('../middleware.utils');

router.post('/verify-ticket', adminAuthMiddleware, async (req, res) => {
  const { ticketId } = req.body;
  console.log(ticketId);
  const ticket = await Ticket.findOne({ id: ticketId });
  console.log(ticket);
  if (ticket) {
    res.status(200).send(ticket);
    return;
  }
  res.status(500).json({ error: 'Ticket not Found' });
});

module.exports = router;
