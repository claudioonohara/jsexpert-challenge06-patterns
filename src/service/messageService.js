class MessageService {
  constructor(entityMessage) {
    this.entityMessage = entityMessage;
  }

  sendMessage({ from, to, message }) {
    return this.entityMessage.sendMessage({ from, to, message });
  }
}
module.exports = MessageService;
