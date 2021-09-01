const {src, dest, series} = require('gulp');
const del = require('del');
const zip = require('gulp-zip');

const extensionName = 'F-Notifier';

async function clean() {
  await del(['build']);
  await Promise.resolve();
}

function build() {
  return src('src/**/*.*')
    .pipe(dest('build'));
}

function dist() {
  const manifest = require('./src/manifest.json');
  const distFileName = extensionName + '_v' + manifest.version + '.zip';
  return src('build/**')
    .pipe(zip(distFileName))
    .pipe(dest('dist'));
}

exports.clean = clean;
exports.build = series(clean, build);
exports.dist = series(clean, build, dist);
exports.default = series(clean, build, dist);
