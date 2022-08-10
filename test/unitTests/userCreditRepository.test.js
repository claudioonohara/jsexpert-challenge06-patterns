const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { join } = require("path");
//const fs = require("fs");
const fs = require("fs/promises");

const UserCreditRepository = require("./../../src/repository/userCreditRepository");

const databaseUserCredit = join(
  __dirname,
  "./../../database",
  "databaseUserCredit.json"
);

const fileTest = join(__dirname, "./../../test/mocks/", "fileTest.json");

const mockDatabase = join(
  __dirname,
  "./../../test/mocks/",
  "valid-mockDatabase.json"
);

describe("UserCreditRepository Suite Test", () => {
  context("Create, Update and find methods", () => {
    let userCreditRepository = {};
    let sandbox = {};
    before(async () => {
      // await fs.create(fileTest);
      await fs.writeFile(fileTest, "");
    });
    beforeEach(() => {
      userCreditRepository = new UserCreditRepository({
        file: mockDatabase,
      });
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    after(async () => {
      await fs.unlink(fileTest);
    });

    it("Should Add new Credit Record With User and Type to a list", async () => {
      sandbox
        .stub(
          userCreditRepository,
          userCreditRepository.writeJSONstringifyToFile.name
        )
        .returns(true);

      const expected = [
        { userId: 3, typeOfCredit: "EMAIL", credit: 769 },
        { userId: 3, typeOfCredit: "SMS", credit: 0 },
        { userId: 30, typeOfCredit: "EMAIL", credit: 7691 },
      ];
      const results = await userCreditRepository.create({
        userId: 30,
        typeOfCredit: "EMAIL",
        credit: 7691,
      });

      expect(results).to.be.deep.equal(expected);
    });
    it("Should Update a Credit Record With User and Type to a list", async () => {
      sandbox
        .stub(
          userCreditRepository,
          userCreditRepository.writeJSONstringifyToFile.name
        )
        .returns(true);

      const expected = [
        { userId: 3, typeOfCredit: "SMS", credit: 0 },
        { userId: 3, typeOfCredit: "EMAIL", credit: 7693 },
      ];
      const results = await userCreditRepository.update({
        userId: 3,
        typeOfCredit: "EMAIL",
        credit: 7693,
      });

      expect(results).to.be.deep.equal(expected);
    });

    it("Should Filter records with specified Credit and User Id", async () => {
      const expected = { userId: 3, typeOfCredit: "EMAIL", credit: 769 };
      const results = await userCreditRepository.find({
        paramUserId: 3,
        paramTypeOfCredit: "EMAIL",
      });

      expect(results).to.be.deep.equal(expected);
    });

    it("Should return JSON file as object", async () => {
      const expected = [
        { userId: 3, typeOfCredit: "EMAIL", credit: 769 },
        { userId: 3, typeOfCredit: "SMS", credit: 0 },
      ];
      const results = await userCreditRepository.returnFileContentasJSON(
        mockDatabase
      );
      expect(results).to.be.deep.equal(expected);
    });

    it("Should call Writefile once", async () => {
      const userCreditRepositoryCreate = new UserCreditRepository({
        file: fileTest,
      });
      const content = {
        userId: 30,
        typeOfCredit: "EMAIL",
        credit: 7691,
      };
      await userCreditRepositoryCreate.writeJSONstringifyToFile(content);
      const result = JSON.stringify(JSON.parse(await fs.readFile(fileTest)));
      const expected = JSON.stringify(content);

      expect(result).to.be.deep.equal(expected);
    });
  });
});
