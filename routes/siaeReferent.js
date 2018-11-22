const router = require('express').Router();
const { auth } = require('./auth');

const {
  listSiaeReferent,
  readSiaeReferent,
  createSiaeReferent,
  updateSiaeReferent,
  deleteSiaeReferent,
} = require('../controllers/siaeReferent');

router.get('/', auth.siaeAdmin, listSiaeReferent);
router.post('/', auth.siaeAdmin, createSiaeReferent);

router.get('/:id', auth.siaeAdmin, readSiaeReferent);
router.put('/:id', auth.siaeReferent, updateSiaeReferent);
router.delete('/:id', auth.superAdmin, deleteSiaeReferent);

module.exports = router;
