import '/imports/startup/server';
BrowserPolicy.content.allowFontDataUrl();
import * as Child from 'child_process';

function loadExec() {
  const exec = Child.exec;
  return Meteor.wrapAsync(exec);
}

Meteor.methods({
  getLatestMedia: function() {
    // Customizable path for the application. Allows us to download the images
    // from S3 to any defined path.
    console.log('Syncing media');
    const cmd = loadExec();
    const awsLocalBin = Meteor.settings.private.awsLocalBin;
    const awsS3MediaDepot = Meteor.settings.private.awsS3MediaDepot;
    const installPath = Meteor.settings.public.installPath;
    const syncCmd = `${awsLocalBin} s3 sync ${awsS3MediaDepot} ${installPath}/public/media/`;
    return cmd(syncCmd, { maxBuffer: 1024 * 500 });
  },
});

