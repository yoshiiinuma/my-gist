#!/usr/bin/env node

function usage() {
  console.log("\nusage\n");
  console.log(' my-gists [options] list');
  console.log(' my-gists [options] post <FILE> \'<DESCRIPTION>\'');
  console.log(' my-gists [options] delete <ID>');
  console.log("\noptions\n");
  console.log(' -h, --help');
  console.log(' -u <USERNAME>');
  console.log(' -t <TOKENFILE>');
  console.log(' -c <CONFIGJSON>  /* default ./.my-gists-config.json */');
  console.log("\n")
}

var defaultConfig = '.my-gists-config.json'

var app = require('./lib/MyGists');
var args = process.argv.slice(2);

var command;
var prm;

app.loadConfig(defaultConfig);

while (args.length > 0) {
  prm = args.shift();
  switch(prm) {
    case '-h':
    case '--help':
      usage();
      process.exit(0);
      break;
    case 'list':
      command = 'list';
      break;
    case 'post':
      command = 'post';
      app.setGistSrc(args.shift());
      app.setGistDesc(args.shift());
      break;
    case 'delete':
      command = 'delete';
      app.setGistId(args.shift());
      break;
    case '-t':
      app.setTokenFile(args.shift());
      break;
    case '-c':
      let conf = args.shift();
      app.loadConfig(conf);
      break;
    case '-u':
      app.setUserName(args.shift());
      break;
    default:
      app.addErrors('Unsupported Parameter: ' + prm);
  }
}

if (!command) {
  app.addErrors('ERROR: No Command Specified');
}

switch(command) {
  case 'list':
    app.list();
    break;
  case 'post':
    app.post();
    break;
  case 'delete':
    app.deletePost();
    break;
}

if (app.hasErrors()) {
  app.showErrors();
  usage();
  process.exit(1);
}
