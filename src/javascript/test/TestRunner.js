/*global define, require, QUnit*/
define([], (function () {
  "use strict";

  // Configure RequireJS so it resolves relative module paths from the `src`
  // folder.
  require.config({
    baseUrl: "../javascript"
  });

  // A list of all QUnit test Modules.  Make sure you include the `.js` 
  // extension so RequireJS resolves them as relative paths rather than using
  // the `baseUrl` value supplied above.
  var testModules = [
    'SampleTest.js'
  ];

  // Resolve all testModules and then start the Test Runner.
  require(testModules, function () {
    QUnit.load();
    QUnit.start();
  });
  
}()));

