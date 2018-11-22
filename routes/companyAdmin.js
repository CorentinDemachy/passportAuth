const router = require('express').Router();
const { auth } = require('./auth');

const {
  listCompanyAdmin,
  readCompanyAdmin,
  createCompanyAdmin,
  updateCompanyAdmin,
  deleteCompanyAdmin,
} = require('../controllers/companyAdmin');

router.get('/', auth.jumper, listCompanyAdmin);
router.post('/', auth.superAdmin, createCompanyAdmin);

router.get('/:id', auth.jumper, readCompanyAdmin);
router.put('/:id', auth.superAdmin, updateCompanyAdmin);
router.delete('/:id', auth.superAdmin, deleteCompanyAdmin);

module.exports = router;
