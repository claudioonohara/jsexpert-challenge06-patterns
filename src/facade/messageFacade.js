const UserCreditFactory = require("../factory/userCreditFactory");
const MessageFactory = require("../factory/messageFactory");

class MessageFacade {
  constructor(type) {
    this.type = type;
    this.userCreditService = UserCreditFactory.generateInstance();
    this.messageService = MessageFactory.generateInstance({
      type: this.type,
    });
  }

  async sendMessage({ userId, from, to, message }) {
    return await this._tryToSendMessage({
      userId,
      from,
      to,
      message,
    });
  }

  async _tryToSendMessage({ userId, from, to, message }) {
    const resultdecreaseOneCreditUserCreditBalance =
      await this.userCreditService.decreaseOneCreditUserCreditBalance({
        userId,
        typeOfCredit: this.type,
      });
    if (isNaN(resultdecreaseOneCreditUserCreditBalance)) {
      return resultdecreaseOneCreditUserCreditBalance;
    }
    const resultMessageFactory = this.messageService.sendMessage({
      from,
      to,
      message,
    });
    return resultMessageFactory;
  }
}

module.exports = MessageFacade;
