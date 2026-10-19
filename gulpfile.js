const {rm} = require('node:fs/promises');
const {src, dest, series} = require('gulp');

const extensionName = 'F-Notifier';

async function clean() {
  await rm('build', {recursive: true, force: true});
}

function build() {
  return src('src/**/*.*')
    .pipe(dest('build'));
}

async function dist() {
  const {default: zip} = await import('gulp-zip');
  const manifest = require('./src/manifest.json');
  const distFileName = extensionName + '_v' + manifest.version + '.zip';
  await new Promise((resolve, reject) => {
    src('build/**')
      .pipe(zip(distFileName))
      .pipe(dest('dist'))
      .on('end', resolve)
      .on('error', reject);
  });
}

exports.clean = clean;
exports.build = series(clean, build);
exports.dist = series(clean, build, dist);
exports.default = series(clean, build, dist);
