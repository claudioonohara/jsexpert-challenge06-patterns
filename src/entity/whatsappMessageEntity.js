const BaseMessage = require("./base/baseMessage");

class WhatsappMessageEntity extends BaseMessage {
  constructor() {
    super();
  }

  sendMessage({ from, to, message }) {
    return `This message was sent by Whatsapp from ${from} to ${to}  with this message ${message}`;
  }
}
module.exports = WhatsappMessageEntity;
