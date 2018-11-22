const router = require('express').Router();
const { auth } = require('./auth');

const {
  listSiaeAdmin,
  readSiaeAdmin,
  createSiaeAdmin,
  updateSiaeAdmin,
  deleteSiaeAdmin,
} = require('../controllers/siaeAdmin');

router.get('/', auth.jumper, listSiaeAdmin);
router.post('/', auth.superAdmin, createSiaeAdmin);

router.get('/:id', auth.jumper, readSiaeAdmin);
router.put('/:id', auth.superAdmin, updateSiaeAdmin);
router.delete('/:id', auth.superAdmin, deleteSiaeAdmin);

module.exports = router;
