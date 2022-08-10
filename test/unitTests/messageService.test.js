const { describe, it } = require("mocha");
const { expect } = require("chai");
const MessageService = require("./../../src/service/messageService");
const EmailMessageEntity = require("./../../src/entity/emailMessageEntity");
const validEmailMessage = require("./../mocks/valid-emailMessageEntity.json");
const sinon = require("sinon");

describe("Message Service Suite Test", () => {
  context("Send Message method", () => {
    it("Should should call the sendMessage method for a given entity", () => {
      const emailMessageEntity = new EmailMessageEntity();
      const messageService = new MessageService(emailMessageEntity);
      sinon.spy(emailMessageEntity, emailMessageEntity.sendMessage.name);
      messageService.sendMessage(validEmailMessage);
      expect(emailMessageEntity.sendMessage.calledOnce).to.be.ok;
    });
  });
});
