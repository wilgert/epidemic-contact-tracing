module.exports = {
  name: 'current-hash',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/current-hash',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
