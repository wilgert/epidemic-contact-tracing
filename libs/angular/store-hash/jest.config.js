module.exports = {
  name: 'store-hash',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/store-hash',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
