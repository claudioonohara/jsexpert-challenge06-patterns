const { describe, it } = require("mocha");
const { expect } = require("chai");
const MessageFactory = require("./../../src/factory/messageFactory");
const EmailMessageEntity = require("./../../src/entity/emailMessageEntity");
const SmsMessageEntity = require("./../../src/entity/smsMessageEntity");
const WhatsappEntity = require("./../../src/entity/whatsappMessageEntity");

const {
  CREDIT_TYPE_EMAIL,
  CREDIT_TYPE_SMS,
  CREDIT_TYPE_WHATSAPP,
} = require("./../../src/shared/constants");

const messageInfo = { from: "test", to: "test2", message: "hello" };

describe("Message Factory Suite Test", () => {
  context("Generate instance method", () => {
    it("Should return Message Service With Email Entity if the type of credit is email", () => {
      const messageService = MessageFactory.generateInstance({
        type: CREDIT_TYPE_EMAIL,
        ...messageInfo,
      });
      const entityMessage = messageService.entityMessage;
      expect(entityMessage instanceof EmailMessageEntity).to.be.ok;
    });
    it("Should return Message Service With Sms Entity if the type of credit is sms", () => {
      const messageService = MessageFactory.generateInstance({
        type: CREDIT_TYPE_SMS,
        ...messageInfo,
      });
      const entityMessage = messageService.entityMessage;
      expect(entityMessage instanceof SmsMessageEntity).to.be.ok;
    });
    it("Should return Message Service With Whatsapp Entity if the type of credit is whatsapp", () => {
      const messageService = MessageFactory.generateInstance({
        type: CREDIT_TYPE_WHATSAPP,
        ...messageInfo,
      });
      const entityMessage = messageService.entityMessage;
      expect(entityMessage instanceof WhatsappEntity).to.be.ok;
    });
  });
});
