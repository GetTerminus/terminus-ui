// https://github.com/angular/angular/issues/29703
module.exports = {
  packages: {
    '@terminus/ui': {
      entryPoints: { './dist/library': { ignore: true } },
    },
  },
};
