const { describe, it } = require("mocha");
const { expect } = require("chai");
const WhatsappMessageEntity = require("./../../src/entity/whatsappMessageEntity");

const validWhatsappMessage = require("./../mocks/valid-whatsappMessageEntity.json");

describe("WhatsappMessageEntity Suite Test", () => {
  context("Send Message method", () => {
    it("Should return a message with type Email, User Id, Sender and Receiver ", () => {
      const whatsappMessageEntity = new WhatsappMessageEntity();
      const message = whatsappMessageEntity.sendMessage(validWhatsappMessage);
      const expected =
        "This message was sent by Whatsapp from Whatsapp Sender to Whatsapp Receiver  with this message Whatsapp message";
      expect(message).to.be.deep.equal(expected);
    });
  });
});
