const fakeCompanyAdmin = (companyId, i) => ({
  password: `companyAdmin${i}`,
  companyId,
  email: `companyAdmin${i}@email.com`,
});

module.exports = fakeCompanyAdmin;
