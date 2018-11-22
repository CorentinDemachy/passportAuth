const router = require('express').Router();
const { auth } = require('./auth');

const {
  listCompanyReferent,
  readCompanyReferent,
  createCompanyReferent,
  updateCompanyReferent,
  deleteCompanyReferent,
} = require('../controllers/companyReferent');

router.get('/', auth.companyAdmin, listCompanyReferent);
router.post('/', auth.companyAdmin, createCompanyReferent);

router.get('/:id', auth.companyAdmin, readCompanyReferent);
router.put('/:id', auth.companyReferent, updateCompanyReferent);
router.delete('/:id', auth.superAdmin, deleteCompanyReferent);

module.exports = router;
