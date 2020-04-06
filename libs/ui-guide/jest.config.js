module.exports = {
  name: 'ui-guide',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-guide',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
