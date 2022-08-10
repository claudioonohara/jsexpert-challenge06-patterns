const { describe, it } = require("mocha");
const { expect } = require("chai");
const SmsMessageEntity = require("./../../src/entity/smsMessageEntity");

const validsmsMessage = require("./../mocks/valid-smsMessageEntity.json");

describe("SMSMessageEntity Suite Test", () => {
  context("Send Message method", () => {
    it("Should return a message with type Email, User Id, Sender and Receiver ", () => {
      const smsMessageEntity = new SmsMessageEntity();
      const message = smsMessageEntity.sendMessage(validsmsMessage);
      const expected =
        "This message was sent by SMS from SMS Sender to SMS Receiver  with this message SMS message";
      expect(message).to.be.deep.equal(expected);
    });
  });
});
