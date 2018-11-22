const fakeMission = (coworkerId, coachId, companyId, companyReferentId, i) => ({
  coworkerId,
  coachId,
  companyId,
  companyReferentId,
  startDate: '1980-06-17T00:00:00.000Z',
  endDate: '1980-06-17T00:00:00.000Z',
  totalHours: 0,
  location: '0.0:0.0',
  name: `mission${i}`,
  description: 'Basic mission for a coworker',
});

module.exports = fakeMission;
