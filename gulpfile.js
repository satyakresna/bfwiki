const gulp = require('gulp');
const rename = require('gulp-rename');
const inject = require('gulp-inject-string');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const historyApiFallback = require('connect-history-api-fallback');

gulp.task('css', async function() {
  gulp.src('./src/css/style.css')
    .pipe(postcss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', async function () {
  gulp.src(['./src/**/.*html', './src/*.html'])
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('assets', async function () {
  gulp.src('./src/assets/**')
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js-plugins', async function () {
  gulp.src('./src/js/plugins/**')
    .pipe(gulp.dest('./dist/js/plugins/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js-utils', async function () {
  gulp.src('./src/js/utils/**')
    .pipe(gulp.dest('./dist/js/utils/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js-pages', async function () {
  gulp.src('./src/js/pages/**')
    .pipe(gulp.dest('./dist/js/pages/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js-components', async function () {
  gulp.src('./src/js/components/**')
    .pipe(gulp.dest('./dist/js/components/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', async function () {
  gulp.src('./src/js/**')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', async function () {
  gulp.watch('./src/assets/**', gulp.series('assets'));
  gulp.watch('./src/js/**', gulp.series('js'));
  gulp.watch(['./src/**/*.html'], gulp.series('html', 'css')).on('change', browserSync.reload);
  gulp.watch('./src/css/style.css', gulp.series('css')).on('change', browserSync.reload);
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

gulp.task('inject:analytics', function (done) {
  gulp.src('src/index.html')
    .pipe(inject.before('</head>',  `
    <link rel="preconnect" href="https://www.google-analytics.com">
    <script defer src='https://www.google-analytics.com/analytics.js'></script>
    <!-- Google Analytics -->
    <script defer>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
      ga('create', 'UA-130613302-2', 'auto');
      ga('send', 'pageview');
    </script>
    `))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
    done();
});

// For production
gulp.task('build', gulp.series('html', 'css', 'assets', 'js'));

// For development
gulp.task('default', gulp.series('build', 'watch', 'browserSync'));