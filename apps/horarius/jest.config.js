module.exports = {
  name: 'horarius',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/horarius',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
