const { readFile, writeFile } = require("fs/promises");

class UserCreditRepository {
  constructor({ file }) {
    this.file = file;
  }

  async create(userCredit) {
    const content = await this.returnFileContentasJSON();

    content.push(userCredit);

    await this.writeJSONstringifyToFile(content);

    return content;
  }

  async update(userCredit) {
    const content = await this.returnFileContentasJSON();
    const contentUpdated = content.filter(
      ({ userId, typeOfCredit }) =>
        !(
          userId === userCredit.userId &&
          typeOfCredit === userCredit.typeOfCredit
        )
    );

    contentUpdated.push(userCredit);

    await this.writeJSONstringifyToFile(contentUpdated);

    return contentUpdated;
  }

  async find({ paramUserId, paramTypeOfCredit }) {
    const content = await this.returnFileContentasJSON();

    return content.find(
      ({ userId, typeOfCredit }) =>
        userId === paramUserId && typeOfCredit === paramTypeOfCredit
    );
  }

  async returnFileContentasJSON() {
    return JSON.parse(await readFile(this.file));
  }

  async writeJSONstringifyToFile(content) {
    await writeFile(this.file, JSON.stringify(content));
  }
}
module.exports = UserCreditRepository;
