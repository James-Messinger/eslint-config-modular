"use strict";

const ESLint = require("../utils/eslint");
const chai = require("chai");
chai.should();

describe("modules/cjs", function () {
  it("should not be enforced if module is not used", function () {
    let results = ESLint.run("@jsdevtools/modular/style", "foo(); function foo () {}\n");
    results.errorCount.should.equal(0);
  });

  it('should require the "use strict" pragma at the global level', function () {
    let results = ESLint.run("@jsdevtools/modular/modules/cjs", "function foo () {} foo();");
    results.errorCount.should.equal(1);
    results.rules.should.deep.equal(["strict"]);
    results.messages[0].message.should.equal("Use the global form of 'use strict'.");
  });

  it("should not allow ES6 module syntax", function () {
    let results = ESLint.run("@jsdevtools/modular/modules/cjs", "import foo from 'bar';");
    results.errorCount.should.equal(1);
    results.messages.should.have.lengthOf(1);
    results.messages[0].message.should.equal("Parsing error: The keyword 'import' is reserved");
  });
});
