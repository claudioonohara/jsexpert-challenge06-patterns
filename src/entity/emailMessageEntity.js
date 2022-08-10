const BaseMessage = require("./base/baseMessage");

class EmailMessageEntity extends BaseMessage {
  constructor() {
    super();
  }

  sendMessage({ from, to, message }) {
    return `This message was sent by email from ${from} to ${to}  with this message ${message}`;
  }
}
module.exports = EmailMessageEntity;
