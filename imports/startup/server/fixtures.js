import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import ExhibitComponents from '/imports/api/exhibitComponents/exhibitComponents';
import Videos from '/imports/api/videos/videos';

const users = [
  {
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Carl', last: 'Winslow' },
    },
    roles: ['admin'],
  },
];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});

/**
 * Populate content after reset
 *
 * Note about Meteor and the Assets object:
 * Assets is the Meteor file access system.
 * It's not currently possible to import Assets as an ES6 module.
 * So even though it throws a linting error, it's fine to just use it here
 * without importing it.
 */

/**
 * Import Exhibit Components
 */
if (ExhibitComponents.find().count() === 0) {
  // noinspection Eslint
  const exhibitComponentData = JSON.parse(Assets.getText('exhibitComponents.json'));
  exhibitComponentData.forEach((item) => {
    ExhibitComponents.insert(item);
  });
}

/**
 * Import videos
 */
if (Videos.find().count() === 0) {
  // noinspection Eslint
  const videoData = JSON.parse(Assets.getText('videos.json'));
  videoData.forEach((item) => {
    Videos.insert(item);
  });
}
