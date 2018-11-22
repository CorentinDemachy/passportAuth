const fakeSiaeAdmin = (siaeId, i) => ({
  password: `siaeAdmin${i}`,
  siaeId,
  email: `siaeAdmin${i}@email.com`,
});

module.exports = fakeSiaeAdmin;
