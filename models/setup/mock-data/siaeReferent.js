const fakeSiaeReferent = (siaeId, i) => ({
  siaeId,
  password: `siaeReferent${i}`,
  firstName: `siaeReferent${i}`,
  lastName: `siaeReferent${i}`,
  email: `siaeReferent${i}@email.com`,
  phone: '0000000000',
});

module.exports = fakeSiaeReferent;
