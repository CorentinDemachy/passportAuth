const fakeCoworker = (siaeReferentId, siaeId, i) => ({
  siaeReferentId,
  siaeId,
  password: `coworker${i}`,
  firstName: `coworker${i}`,
  lastName: `coworker${i}`,
  notes: 'This coworker is insane!',
  email: `coworker${i}@email.com`,
  phone: '0000000000',
});

module.exports = fakeCoworker;
