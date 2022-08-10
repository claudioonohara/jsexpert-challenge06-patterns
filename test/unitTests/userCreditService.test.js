const { expect } = require("chai");
const { it, describe } = require("mocha");
const sinon = require("sinon");
const { join } = require("path");
const UserCreditServiceMotherObject = require("./userCreditServiceMotherObject");

const UserCreditService = require("./../../src/service/userCreditService");
const UserCreditRepository = require("./../../src/repository/userCreditRepository");
const mockDatabase = join(
  __dirname,
  "./../../test/mocks/",
  "valid-mockDatabase.json"
);

describe("UserCreditService Suite Test", () => {
  let userCreditRepository = {};
  let userCreditService = {};
  let sandbox = {};
  before(() => {
    userCreditRepository = new UserCreditRepository({
      file: mockDatabase,
    });
    userCreditService = new UserCreditService({ userCreditRepository });
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  it("Should call UserCreditRepository create method", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(
        userCreditService.userCreditRepository,
        userCreditService.userCreditRepository.create.name
      )
      .resolves(validUserCredit);
    await userCreditService.create(validUserCredit);
    expect(userCreditService.userCreditRepository.create.calledOnce).to.be.ok;
  });
  it("Should call UserCreditRepository update method", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(
        userCreditService.userCreditRepository,
        userCreditService.userCreditRepository.update.name
      )
      .resolves(validUserCredit);
    await userCreditService.update(validUserCredit);
    expect(userCreditService.userCreditRepository.update.calledOnce).to.be.ok;
  });
  it("Should call UserCreditRepository find method", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(
        userCreditService.userCreditRepository,
        userCreditService.userCreditRepository.find.name
      )
      .resolves(validUserCredit);
    await userCreditService.find(validUserCredit);
    expect(userCreditService.userCreditRepository.find.calledOnce).to.be.ok;
  });
  it("Should return a error message in an attempt to obtain the balance with insufficient information", async () => {
    const InvalidUserCredit = UserCreditServiceMotherObject.withNullUserId();
    const result = await userCreditService.getUserCreditBalance(
      InvalidUserCredit
    );
    const expected = "User id and Type Of Credit must be provided";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return a error message if a provided User or Type of Credit does not exists", async () => {
    const userCreditWithInexistentTypeOfCredit =
      UserCreditServiceMotherObject.withInexistentTypeOfCredit();
    const result = await userCreditService.getUserCreditBalance(
      userCreditWithInexistentTypeOfCredit
    );
    const expected =
      "User id 5 should buy credits to send INEXISTENT TYPE message";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return the User credit for a given type", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(userCreditService, userCreditService.find.name)
      .resolves(validUserCredit);
    const result = await userCreditService.getUserCreditBalance(
      validUserCredit
    );
    const expected = validUserCredit.credit;
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return error message when try to decrease balance of inexistent user or type", async () => {
    const userCreditWithInexistentTypeOfCredit =
      UserCreditServiceMotherObject.withInexistentTypeOfCredit();
    const result = await userCreditService.decreaseOneCreditUserCreditBalance(
      userCreditWithInexistentTypeOfCredit
    );
    const expected =
      "User id 5 should buy credits to send INEXISTENT TYPE message";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return error message when try to decrease balance that will became negative", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(userCreditService, userCreditService.getUserCreditBalance.name)
      .resolves(0);
    const result = await userCreditService.decreaseOneCreditUserCreditBalance(
      validUserCredit
    );
    const expected = "Insuficient Balance";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return decreased value for correct user and type", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(userCreditService, userCreditService.getUserCreditBalance.name)
      .resolves(5);
    sandbox
      .stub(userCreditService, userCreditService.update.name)
      .resolves(false);
    const result = await userCreditService.decreaseOneCreditUserCreditBalance(
      validUserCredit
    );
    const expected = 4;
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return error message when try to buy balance of inexistent user or type", async () => {
    const userCreditNull = UserCreditServiceMotherObject.withNullUserId();
    const result = await userCreditService.buyUserCreditBalance(userCreditNull);
    const expected = "User id and Type Of Credit and Credit must be provided";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return error message when try to buy 0 or negative balance", async () => {
    const userCreditNoBalance = UserCreditServiceMotherObject.withNoBalance();
    const result = await userCreditService.buyUserCreditBalance(
      userCreditNoBalance
    );
    const expected = "The credit must be bigger than zero";
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return increased value for correct user, type and balance", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(userCreditService, userCreditService.find.name)
      .resolves(validUserCredit);
    sandbox
      .stub(userCreditService, userCreditService.getUserCreditBalance.name)
      .resolves(5);
    sandbox
      .stub(userCreditService, userCreditService.update.name)
      .resolves(false);
    const result = await userCreditService.buyUserCreditBalance(
      validUserCredit
    );
    const expected = 105;
    expect(result).to.be.deep.equal(expected);
  });
  it("Should return bought credit for new user", async () => {
    const validUserCredit = UserCreditServiceMotherObject.valid();
    sandbox
      .stub(userCreditService, userCreditService.find.name)
      .resolves(undefined);
    sandbox
      .stub(userCreditService, userCreditService.create.name)
      .resolves(true);
    const result = await userCreditService.buyUserCreditBalance(
      validUserCredit
    );
    const expected = 100;
    expect(result).to.be.deep.equal(expected);
  });
});
