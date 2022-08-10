const { describe, it } = require("mocha");
const { expect } = require("chai");
const MessageFacade = require("./../../src/facade/messageFacade");
const UserCreditFactory = require("./../../src/factory/userCreditFactory");
const MessageFactory = require("./../../src/factory/messageFactory");
const sinon = require("sinon");

const { CREDIT_TYPE_EMAIL } = require("./../../src/shared/constants");

const messageInfo = { from: "test", to: "test2", message: "hello" };

describe("Message Facade Suite Test", () => {
  context("Send Message method", () => {
    let messageFacade = {};
    let sandbox = {};
    before(() => {
      messageFacade = new MessageFacade(CREDIT_TYPE_EMAIL);
    });
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it("Should send a Message if User has enough credit for given type of message", async () => {
      sandbox
        .stub(
          messageFacade.userCreditService,
          messageFacade.userCreditService.decreaseOneCreditUserCreditBalance
            .name
        )
        .resolves(1);
      sandbox
        .stub(
          messageFacade.messageService,
          messageFacade.messageService.sendMessage.name
        )
        .resolves(
          "This message was sent by email from from1 to to1  with this message message"
        );
      const results = await messageFacade.sendMessage({
        userId: 999,
        from: "from1",
        to: "to1",
        message: "message",
      });
      const expected =
        "This message was sent by email from from1 to to1  with this message message";
      expect(results).to.be.deep.equal(expected);
    });
    it("Should return a error message and do not send a message when decrease user credit for a given type fails", async () => {
      sandbox
        .stub(
          messageFacade.userCreditService,
          messageFacade.userCreditService.decreaseOneCreditUserCreditBalance
            .name
        )
        .resolves("Insuficient Balance");
      const results = await messageFacade.sendMessage({
        userId: 999,
        from: "from1",
        to: "to1",
        message: "message",
      });
      const expected = "Insuficient Balance";
      expect(results).to.be.deep.equal(expected);
    });
  });
});
