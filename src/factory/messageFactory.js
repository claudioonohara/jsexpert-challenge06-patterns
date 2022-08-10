const EmailMessageEntity = require("../entity/emailMessageEntity");
const SMSMessageEntity = require("../entity/smsMessageEntity");
const WhatsappMessageEntity = require("../entity/whatsappMessageEntity");
const MessageService = require("../service/messageService");
const {
  CREDIT_TYPE_EMAIL,
  CREDIT_TYPE_SMS,
  CREDIT_TYPE_WHATSAPP,
} = require("../shared/constants");

class MessageFactory {
  static generateInstance({ type }) {
    switch (type) {
      case CREDIT_TYPE_EMAIL: {
        const messageEntity = new EmailMessageEntity();
        const messageService = new MessageService(messageEntity);
        return messageService;
      }
      case CREDIT_TYPE_SMS: {
        const messageEntity = new SMSMessageEntity();
        const messageService = new MessageService(messageEntity);
        return messageService;
      }
      case CREDIT_TYPE_WHATSAPP: {
        const messageEntity = new WhatsappMessageEntity();
        const messageService = new MessageService(messageEntity);
        return messageService;
      }
    }
  }
}
module.exports = MessageFactory;
