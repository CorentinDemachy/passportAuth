const router = require('express').Router();
const { auth } = require('./auth');

const {
  listCoworker,
  readCoworker,
  createCoworker,
  updateCoworker,
  deleteCoworker,
} = require('../controllers/coworker');

router.get('/', auth.jumperSiae, listCoworker);
router.post('/', auth.siaeReferent, createCoworker);

router.get('/:id', auth.jumperSiae, readCoworker);
router.put('/:id', auth.jumper, updateCoworker);
router.delete('/:id', auth.superAdmin, deleteCoworker);

module.exports = router;
