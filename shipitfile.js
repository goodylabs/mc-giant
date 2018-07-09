/* eslint-disable */
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-yarn')(shipit);
  require('shipit-pm2')(shipit);
  require('shipit-slack')(shipit);
  var moment = require('moment');

  switch (shipit.environment) {
      case 'production':
          var env = 'Production';
          break;
  }

  shipit.initConfig({
      default: {
          workspace: './.shipit',
          deployTo: '/home/mcgiant/mcgiant',
          repositoryUrl: 'git@github.com:goodylabs/mc-giant.git',
          ignores: ['.git', 'node_modules'],
          keepReleases: 3,
          deleteOnRollback: false,
          shallowClone: true,
          branch: 'master',
          yarn: {
            remote: true,
            installFlags: [],
          },
        }
          //branch: 'pl/koa-deploy'
      },
      production: {
          branch: 'master',
          servers: ['mcgiant@46.101.212.29'],
          pm2: {
              json: '/home/mcgiant/mcgiant/current/pm2/production.json'
          }
      }

  });

  // shipit.blTask('build:yarn', function() {
  //     return shipit.local(`cd ${shipit.config.workspace} && yarn`).then(function(res){
  //         //res.child.stdout.pipe(process.stdout);
  //         //res.child.stderr.pipe(process.stderr);
  //     });
  // });

  // shipit.blTask('build:next', function() {
  //   console.log('XXXXXXXXXXXX')
  //   return shipit.remote('pwd')
  //     // return shipit.remote(`cd ${shipit.config.workspace} && yarn build`).then(function(res){
  //     //     //shipitprocess.stdout);
  //     //     //res[0].child.stderr.pipe(process.stderr);
  //     // });
  // });

  // shipit.on('yarn_installed', function() {
  //     shipit.start(['yarn:cmd']);
  // });

};