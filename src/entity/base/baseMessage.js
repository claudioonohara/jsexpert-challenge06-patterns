const NotImplementedException = require("./notImplementedException");

class BaseMessage {
  sendMessage({ from, to, message }) {
    throw new NotImplementedException(this.render.name);
  }
}

module.exports = BaseMessage;
