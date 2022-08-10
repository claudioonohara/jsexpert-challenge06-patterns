class UserCreditService {
  constructor({ userCreditRepository }) {
    this.userCreditRepository = userCreditRepository;
  }

  async create(userCredit) {
    await this.userCreditRepository.create(userCredit);
  }

  async update(userCredit) {
    await this.userCreditRepository.update(userCredit);
  }

  async find({ userId, typeOfCredit }) {
    return await this.userCreditRepository.find({
      paramUserId: userId,
      paramTypeOfCredit: typeOfCredit,
    });
  }

  async getUserCreditBalance({ userId, typeOfCredit }) {
    if (!userId || !typeOfCredit) {
      return "User id and Type Of Credit must be provided";
    }

    const userCredit = await this.find({ userId, typeOfCredit });

    if (typeof userCredit === "undefined") {
      return `User id ${userId} should buy credits to send ${typeOfCredit} message`;
    }
    return userCredit.credit;
  }

  async decreaseOneCreditUserCreditBalance({ userId, typeOfCredit }) {
    let userCreditBalance = await this.getUserCreditBalance({
      userId,
      typeOfCredit,
    });

    if (isNaN(userCreditBalance)) return userCreditBalance;
    if (userCreditBalance <= 0) return "Insuficient Balance";

    userCreditBalance -= 1;

    await this.update({ userId, typeOfCredit, credit: userCreditBalance });

    return userCreditBalance;
  }

  async buyUserCreditBalance({ userId, typeOfCredit, credit }) {
    if (!userId || !typeOfCredit || !credit) {
      return "User id and Type Of Credit and Credit must be provided";
    }

    if (credit <= 0) return "The credit must be bigger than zero";

    const userCredit = await this.find({ userId, typeOfCredit });
    if (typeof userCredit === "undefined") {
      await this.create({ userId, typeOfCredit, credit });
      return credit;
    } else {
      let userCreditBalance = await this.getUserCreditBalance({
        userId,
        typeOfCredit,
      });
      userCreditBalance += credit;
      const saida = await this.update({
        userId,
        typeOfCredit,
        credit: userCreditBalance,
      });
      return userCreditBalance;
    }
  }
}
module.exports = UserCreditService;
