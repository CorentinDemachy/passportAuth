/* eslint-disable no-loop-func,no-shadow,no-restricted-syntax */
const Models = require('./models/index');
const fakeData = require('./models/setup/index');

const {
  sequelize,
  Company,
  CompanyAdmin,
  CompanyReferent,
  Coworker,
  CoworkerSkill,
  FeedbackCompany,
  FeedbackCoworker,
  FeedbackSiaeReferent,
  Jumper,
  Mission,
  MissionSkill,
  Siae,
  SiaeAdmin,
  SiaeReferent,
  Skill,
} = Models;

const {
  fakeCompany,
  fakeCompanyAdmin,
  fakeCompanyReferent,
  fakeCoworker,
  fakeCoworkerSkill,
  fakeFeedbackCompany,
  fakeFeedbackCoworker,
  fakeFeedbackSiaeReferent,
  fakeJumper,
  fakeMission,
  fakeMissionSkill,
  fakeSiae,
  fakeSiaeAdmin,
  fakeSiaeReferent,
  fakeSkill,
} = fakeData;

sequelize.sync({ force: true }).then(() => {
  console.log('Tables cleaned');

  Jumper.createJumper(fakeJumper(0)).then(() => {
    const siaePromises = [];
    for (let i = 0; i < 10; i += 1) {
      siaePromises.push(Siae.createSiae(fakeSiae(i)));
    }
    return Promise.all(siaePromises);
  })

    .then(() => {
      Siae.listSiae({
        raw: true,
      }).then((siaes) => {
        const siaeReferentPromises = [];
        for (let i = 0; i < siaes.length; i += 1) {
          const siae = siaes[i];
          for (let j = 0; j < 5; j += 1) {
            siaeReferentPromises.push(SiaeReferent.createSiaeReferent(fakeSiaeReferent(siae.id, i * 5 + j)));
          }
        }
        return Promise.all(siaeReferentPromises);
      })

        .then(() => {
          Siae.listSiae({
            include: [
              {
                model: SiaeReferent,
                attributes: ['id', 'siaeId'],
              },
            ],
            raw: true,
            nest: true,
          }).then((siaeSiaeReferents) => {
            const coworkersPromises = [];
            for (let i = 0; i < siaeSiaeReferents.length; i += 1) {
              const siaeReferent = siaeSiaeReferents[i].SiaeReferents;
              for (let j = 0; j < 5; j += 1) {
                coworkersPromises.push(Coworker.createCoworker(
                  fakeCoworker(siaeReferent.id, siaeReferent.siaeId, i * 5 + j),
                ));
              }
            }
            return Promise.all(coworkersPromises);
          })

            .then(() => {
              const companyPromises = [];
              for (let i = 0; i < 10; i += 1) {
                companyPromises.push(Company.createCompany(fakeCompany(i)));
              }
              return Promise.all(companyPromises);
            })

            .then(() => {
              Company.listCompany({
                raw: true,
              }).then((companies) => {
                const companyReferentPromises = [];
                for (let i = 0; i < companies.length; i += 1) {
                  const company = companies[i];
                  for (let j = 0; j < 5; j += 1) {
                    companyReferentPromises.push(CompanyReferent.createCompanyReferent(fakeCompanyReferent(company.id, i * 5 + j)));
                  }
                }
                return Promise.all(companyReferentPromises);
              })

                .then(() => {
                  console.log('Setup finished');
                  process.exit();
                });
            });
        });
    });
});
