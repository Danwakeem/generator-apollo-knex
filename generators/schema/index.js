'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const fs = require('fs');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the transcendent ${chalk.red('generator-apollo-knex')} generator!`)
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message:
          "File name for your sample schema file",
        default: "sample"
      },
      {
        type: "input",
        name: "apiName",
        message:
          "What would you like the name of the first sample schema to be? (You will probably replace this but just here to get you started)",
        default: "sample"
      },
      {
        type: "input",
        name: "tableName",
        message:
          "This is the table name that will map to your sample graphql schema.",
        default: "sample"
      },
    ]);

    this.answers.apiNameCap = _.capitalize(this.answers.apiName);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("sample"),
      this.destinationPath(`src/schemas/${this.answers.name}/${this.answers.name}.ts`), 
      {
        ...this.answers,
      }
    );

    this.fs.copyTpl(
      this.templatePath("sample.spec"),
      this.destinationPath(`src/schemas/${this.answers.name}/${this.answers.name}.spec.ts`),
      {
        ...this.answers,
      }
    );

    if (fs.existsSync("src/schemas/index.ts")) {
      const path = "src/schemas/index.ts";
      const content = this.fs.read(path);
      const replace = `, ${name} };`
      const newContent = content.replace(/(,\s*|\s*)};/gmi, replace);
      this.fs.write(path, newContent);
    } else {
      const fileString = `import * as ${name} from './${name}/${name}';\n\nexport { ${name} };\n`
      this.fs.write("src/schemas/index.ts", fileString);
    }
  }

  install() {
    this.installDependencies();
  }
};
