const { describe, it } = require("mocha");
const { expect } = require("chai");
const UserCreditFactory = require("./../../src/factory/userCreditFactory");
const UserCreditService = require("./../../src/service/userCreditService");

describe("User Factory Suite Test", () => {
  context("Generate instance method", () => {
    it("Should return a instance of UserCreditService", () => {
      const userCreditService = UserCreditFactory.generateInstance();
      expect(userCreditService instanceof UserCreditService).to.be.ok;
    });
  });
});
