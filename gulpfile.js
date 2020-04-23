const gulp = require('gulp');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const inject = require('gulp-inject-string');
const historyApiFallback = require('connect-history-api-fallback');
const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');

gulp.task('css', async function() {
  gulp.src('./src/css/style.css')
    .pipe(postcss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', async function () {
  gulp.src(['./src/**/.*html', './src/*.html'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', async function () {
  gulp.src('./src/assets/**')
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', async function () {
  return rollup.rollup({
    input: './src/js/app.js',
    plugins: [
      terser()
    ]
  })
  .then(bundle => {
    return bundle.write({
      dir: './dist/js',
      format: 'es',
      sourcemap: true,
      compact: true
    })
  })
});

gulp.task('data', async function () {
  gulp.src('./src/data/**')
    .pipe(gulp.dest('./dist/data/'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('watch', async function () {
  gulp.watch('./src/assets/**', gulp.series('assets'));
  gulp.watch('./src/data/**', gulp.series('data'));
  gulp.watch(['./src/**/*.html'], gulp.series('html', 'css')).on('change', browserSync.reload);
  gulp.watch('./src/css/style.css', gulp.series('css')).on('change', browserSync.reload);
  gulp.watch('./src/js/**', gulp.series('js')).on('change', browserSync.reload);
});

gulp.task('browserSync', function () {
  browserSync.init({
    watch: true,
    server: {
      baseDir: "./dist/",
      middleware: [ historyApiFallback() ]
    }
  });
});

gulp.task('inject:analytics', async function () {
  const GA_TRACKER_ID = process.env.GA_TRACKER_ID;
  if (GA_TRACKER_ID !== undefined) {
    gulp.src('src/index.html')
    .pipe(inject.before('</head>',  `
    <link rel="preconnect" href="https://www.google-analytics.com">
    <!-- Google Analytics -->
    <script defer>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.defer=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
      ga('create', '${GA_TRACKER_ID}', 'auto');
      ga('send', 'pageview');
    </script>
    `))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist')); 
  } else {
    console.log("GA_TRACKER_ID doesn't exist");
  }
});

// For production
gulp.task('build', gulp.series('html', 'css', 'assets', 'js', 'data'));

// For development
gulp.task('default', gulp.series('build', 'watch', 'browserSync'));