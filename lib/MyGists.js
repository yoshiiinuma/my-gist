
var fs = require('fs');
var path = require('path');
var os = require('os');

var GistClient = require('./GistClient');

var MyGists = (function() {
  var errors = [];
  var userName;
  var accessToken;
  var tokenFile;
  var gistSrc;
  var gistDesc;
  var gistId;
  var gistSrc;

  const configFile = '.my-gists-config.json'

  var loadConfig = function(file) {
    cwd = path.resolve('./', file);
    home = path.resolve(os.homedir(), file);
    let config;
    if (fs.existsSync(cwd)) {
      config = require(cwd);
    } else if (fs.existsSync(home)) {
      config = require(home);
    }
    if (config) {
      if (config.userName) { userName = config.userName; }
      if (config.accessToken) { accessToken = config.accessToken; }
    }
  }

  var show = function() {
    console.log("\nATTRIBUTES:"); 
    console.log(' userName: ' + userName); 
    console.log(' tokenFile: ' + tokenFile); 
    console.log(' accessToken: ' + accessToken); 
    console.log(' gistSrc: ' + gistSrc); 
    console.log(' gistId: ' + gistId); 
    console.log(' gistDesc: ' + gistDesc); 
    console.log("\nERRORS:"); 
    showErrors();
  }

  var addError = function(err) {
    errors.push(err);
  }

  var hasErrors = function() {
    return errors.length == 0 ? false : true
  }

  var showErrors = function() {
    for(let e of errors) {
      console.log(e);
    } 
  }

  var createPostData = function() {
    var data = {};
    data['files'] = {};
    data['files'][gistSrc] = {};
    data['files'][gistSrc]['content'] = fs.readFileSync(gistSrc, 'utf8');
    return data;
  }

  var list = function() {
    testUserName();
    if (hasErrors()) {
      return false;
    }
    return GistClient.list(userName);
  }

  var post = function() {
    testAccessToken();
    testGistSrc();
    testGistDesc();
    if (hasErrors()) {
      return false;
    }
    return GistClient.post(accessToken, gistDesc, createPostData());
  }

  var deletePost = function() {
    testAccessToken();
    testGistId();
    if (hasErrors()) {
      return false;
    }
    return GistClient.deletePost(accessToken, gistId);
  }

  var setUserName = function(val) {
    userName = val;
  }

  var setAccessToken = function(val) {
    accessToken = val;
  }

  var setTokenFile = function(val) {
    tokenFile = val;
  }

  var setGistSrc = function(val) {
    gistSrc = val;
  }

  var setGistId = function(val) {
    gistId = val;
  }

  var setGistDesc = function(val) {
    gistDesc = val;
  }

  var testUserName = function() {
    if (!userName) {
      addError('ERROR: No User Name Specified');
    }
  }

  var testAccessToken = function() {
    if (!accessToken) {
      addError('ERROR: Invalid Access Token');
    }
  }

  var testTokenFile = function() {
    if (tokenFile) {
      if (fs.existsSync(tokenFile)) {
        setAccessToken(fs.readFileSync(tokenFile, 'utf8').replace(/\n*$/, ''));
      } else {
        addError('ERROR: Token File Not Existed: ' + tokenFile);
      }
    }
  }

  var testGistSrc = function() {
    if (gistSrc) {
      if (!fs.existsSync(gistSrc)) {
        addError('ERROR: Gist File Not Existed: ' + gistSrc);
      }
    } else {
      addError('ERROR: No Gist Source File Provided');
    }
  }

  var testGistId = function() {
    if (!gistId) {
      addError('ERROR: No Gist ID Provided');
    }
  }

  var testGistDesc = function() {
    if (!gistDesc) {
      addError('ERROR: No Gist Description Provided')
    }
  }

  return {
    setUserName: setUserName,  
    setAccessToken: setAccessToken,  
    setTokenFile: setTokenFile,  
    setGistSrc: setGistSrc,  
    setGistDesc: setGistDesc,  
    setGistId: setGistId,  
    loadConfig: loadConfig,
    post: post,
    list: list,
    deletePost: deletePost,
    addError: addError,
    hasErrors: hasErrors,
    showErrors: showErrors,
    show: show
  };
})();

module.exports = MyGists;
