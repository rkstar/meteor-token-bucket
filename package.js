Package.describe({
  name: 'rkstar:token-bucket',
  version: '1.2.0',
  // Brief, one-line summary of the package.
  summary: 'Easily create and manage a bucket of tokens',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rkstar/meteor-token-bucket',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2')

  api.use('underscore')
  api.use('ecmascript')

  api.addFiles('token-bucket.js')

  api.export('TokenBucket')
})
