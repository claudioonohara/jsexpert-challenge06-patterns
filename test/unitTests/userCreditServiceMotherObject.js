const UserCreditServiceDataBuilder = require("./userCreditServiceDataBuilder");

class UserCreditServiceMotherObject {
  static valid() {
    return UserCreditServiceDataBuilder.aUserCredit().build();
  }

  static withNullUserId() {
    return UserCreditServiceDataBuilder.aUserCredit().withNullUserId().build();
  }

  static withNullTypeOfCredit() {
    return UserCreditServiceDataBuilder.aUserCredit()
      .withNullTypeOfCredit()
      .build();
  }

  static withInexistentTypeOfCredit() {
    return UserCreditServiceDataBuilder.aUserCredit()
      .withInexistentTypeOfCredit()
      .build();
  }
  static withNoBalance() {
    return UserCreditServiceDataBuilder.aUserCredit().withNoBalance().build();
  }
}

module.exports = UserCreditServiceMotherObject;
