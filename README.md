# JavascriptStarterKit

Javascript project configuration using: Bootstrap, Backbone, RequireJs, QUnit and Marionette. This starting kit contain basic Grunt script to build prod and devel builds validated via JSLint.

Both the production and development build are stored into the deps folder. 

# Devel Build
The devel build will contain the unprocessed javascript files loaded via RequireJS, validated via JSLint and tested via Qunit. Also the assets and vendor scripts will be included.

# Production Builds
The production build will contain the optimized code via RequireJS but without depending on any AMD library. The AMD calls are cleaned up during build. Also the resultant file is minified via uglify.
The vendor scripts are also merged into a single script and the uglified. All the HTML files are processed and the devel script are replaced with production minified scripts.
