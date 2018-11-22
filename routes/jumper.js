const router = require('express').Router();
const { auth } = require('./auth');

const {
  listJumper,
  readJumper,
  createJumper,
  updateJumper,
  deleteJumper,
} = require('../controllers/jumper');

router.get('/', auth.jumper, listJumper);
router.post('/', auth.superAdmin, createJumper);

router.get('/:id', auth.jumper, readJumper);
router.put('/:id', auth.jumper, updateJumper);
router.delete('/:id', auth.superAdmin, deleteJumper);

module.exports = router;
