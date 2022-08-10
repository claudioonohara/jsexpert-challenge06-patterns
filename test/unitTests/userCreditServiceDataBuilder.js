const UserCredit = require("../../src/entity/userCredit");
const { CREDIT_TYPE_EMAIL } = require("../../src/shared/constants");

class UserCreditServiceDataBuilder {
  constructor() {
    this.userCreditData = {
      userId: 5,
      typeOfCredit: CREDIT_TYPE_EMAIL,
      credit: 100,
    };
  }

  static aUserCredit() {
    return new UserCreditServiceDataBuilder();
  }

  withNullUserId() {
    this.userCreditData.userId = null;

    return this;
  }

  withNullTypeOfCredit() {
    this.userCreditData.typeOfCredit = null;

    return this;
  }

  withInexistentTypeOfCredit() {
    this.userCreditData.typeOfCredit = "INEXISTENT TYPE";

    return this;
  }

  withNoBalance() {
    this.userCreditData.credit = -1;

    return this;
  }

  build() {
    const userCredit = new UserCredit(this.userCreditData);
    return userCredit;
  }
}

module.exports = UserCreditServiceDataBuilder;
