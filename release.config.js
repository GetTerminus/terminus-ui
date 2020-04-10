module.exports = {
  branches: 'release',
  plugins: [
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: {
          noteKeywords: [
            'BREAKING CHANGE',
            'BREAKING CHANGES',
            'BREAKING',
          ],
        },
        writerOpts: {
          commitsSort: [
            'subject',
            'scope',
          ],
        },
      },
    ],
    '@semantic-release/git',
  ],
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  prepare: [
    {
      path: '@semantic-release/changelog',
      changelogFile: 'CHANGELOG.md',
    },
    {
      path: '@semantic-release/git',
      // eslint-disable-next-line no-template-curly-in-string
      message: 'Add ${nextRelease.version} release notes [skip ci]',
    },
  ],
  publish: [
    {
      path: '@semantic-release/npm',
      npmPublish: true,
      pkgRoot: 'dist/library',
    },
    {
      path: '@semantic-release/github',
      assets: [
        'CHANGELOG.md',
      ],
      npmPublish: false,
    },
  ],
}
