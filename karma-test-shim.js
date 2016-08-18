/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};


function isJsFile(path) {
  return path.slice(-3) == '.js';//
}

function isSpecFile(path) {
  return path.slice(-8) == '_test.js';//change as _test change spec file to test
}

function isBuiltFile(path) {
  var builtPath = '/base/built/';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}
//this function show that the build base path and build another file.

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)//filters .spec file and will change to _test files.
  .filter(isBuiltFile);//build files that should be build on circumstances filtered 
  //.built file just put it on built folder

// Load our SystemJS.config.js configuration.
System.config({
  baseURL: '/base'
});

System.config(
{
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'app': 'built'
  },
  packages: {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
    },
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    // '@angular/router-deprecated': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    // '@angular/router': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    'rxjs': {
      defaultExtension: 'js'
    }
  }
});

Promise.all([       //return call back and do this
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var testing = providers[0];
  var testingBrowser = providers[1];

  testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule,
    testingBrowser.platformBrowserDynamicTesting());
      //this syntax from above its explain  what are the functions needed..
      //first testing.testBed.initTestEnvironment.. === this shows that what is your test environment
      //the test environment that you use is jasmine... by using what??
      //browser and browser platforms which is already installed in your npm packages.
      //testing this browser on the platform which makes a function..

}).then(function() {
  // Finally, load all spec files.
  // This will run the tests directly.
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    }));
//all specs files will map and import all modules on the system modules..

}).then(__karma__.start, __karma__.error);

//start karma test runner
