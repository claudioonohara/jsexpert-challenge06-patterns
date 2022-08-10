const UserCreditRepository = require("../repository/userCreditRepository");
const UserCreditService = require("../service/userCreditService");
const { join } = require("path");

const file = join(__dirname, "./../../database", "databaseUserCredit.json");

class UserCreditFactory {
  static generateInstance() {
    const userCreditRepository = new UserCreditRepository({ file });
    const userCreditService = new UserCreditService({ userCreditRepository });
    return userCreditService;
  }
}

module.exports = UserCreditFactory;
