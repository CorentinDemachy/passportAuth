const fakeJumper = i => ({
  password: `jumper${i}`,
  firstName: `jumper${i}`,
  lastName: `jumper${i}`,
  email: `jumper${i}@email.com`,
  phone: '0000000000',
  isSuperAdmin: true,
});

module.exports = fakeJumper;
