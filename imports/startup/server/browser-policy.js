import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll(Meteor.settings.public.mediaServer);
