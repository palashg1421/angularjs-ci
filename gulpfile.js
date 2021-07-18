var gulp        = require('gulp');
var concat      = require('gulp-concat');
var clean_css   = require('gulp-clean-css');
var uglify      = require('gulp-uglify');

var source_css = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/angularjs-toaster/toaster.min.css',
    'assets/css/custom.css'
];

var source_js = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootbox/dist/bootbox.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-cookie/angular-cookie.min.js',
    'node_modules/angularjs-toaster/toaster.min.js',
    'node_modules/angular-utils-pagination/dirPagination.js',
    'app/app.js',
    'app/controller/AuthController.js',
    'app/controller/UserController.js',
    'app/routing.js',
    'app/services.js'
];

gulp.task('style', function(){
    let destination = 'assets/build';
    return gulp.src(source_css)
        .pipe(concat('build.min.css'))
        .pipe(clean_css())
        .pipe(gulp.dest(destination));
});

gulp.task('script', function(){
    let destination = 'assets/build';
    return gulp.src(source_js)
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destination));
});

gulp.task('watch', function (){
    gulp.watch(source_css, gulp.parallel('style'));
    gulp.watch(source_js, gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('style', 'script', 'watch'));