const BaseMessage = require("./base/baseMessage");

class SMSMessageEntity extends BaseMessage {
  constructor() {
    super();
  }

  sendMessage({ from, to, message }) {
    return `This message was sent by SMS from ${from} to ${to}  with this message ${message}`;
  }
}
module.exports = SMSMessageEntity;
