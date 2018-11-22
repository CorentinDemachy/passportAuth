const fakeCompanyReferent = (companyId, i) => ({
  companyId,
  password: `companyReferent${i}`,
  firstName: `companyReferent${i}`,
  lastName: `companyReferent${i}`,
  email: `companyReferent${i}@email.com`,
  phone: '0000000000',
});

module.exports = fakeCompanyReferent;
