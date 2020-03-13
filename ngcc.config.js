// https://github.com/angular/angular/issues/29703
module.exports = {
  packages: {
    '@terminus/ui': {
      entryPoints: { './dist/library': { ignore: true } },
      ignorableDeepImportMatchers: [
        /text-mask-core\//,
        /text-mask-addons\//,
        /popper.js\//,
      ],
    },
  },
};
