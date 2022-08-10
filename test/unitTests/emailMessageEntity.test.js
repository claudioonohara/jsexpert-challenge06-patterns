const { describe, it } = require("mocha");
const { expect } = require("chai");
const EmailMessageEntity = require("./../../src/entity/emailMessageEntity");

const validEmailMessage = require("./../mocks/valid-emailMessageEntity.json");

describe("EmailMessageEntity Suite Test", () => {
  context("Send Message method", () => {
    it("Should return a message with type Email, User Id, Sender and Receiver ", () => {
      const emailMessageEntity = new EmailMessageEntity();
      const message = emailMessageEntity.sendMessage(validEmailMessage);
      const expected =
        "This message was sent by email from Email Sender to Email Receiver  with this message Email message";
      expect(message).to.be.deep.equal(expected);
    });
  });
});
