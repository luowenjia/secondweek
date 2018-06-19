var gulp = require("gulp");
var server = require("gulp-webserver");
var less = require("gulp-less");
var minjs = require("gulp-uglify");
var squence = require("gulp-sequence");

var fs = require("fs");
var url = require("url");
var path = require("path");

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/app/index') {
                    res.end(JSON.stringify(data))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

gulp.task("nCss", function() {
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./src/css"))
        .pipe(mincss("style.min.css"))
        .pipe(gulp.dest("./src/bulid/css"));
})

gulp.task("minjs", function() {
    gulp.src("./src/js/*.js")
        .pipe(minjs())
        .pipe(gulp.dest("./src/bulid/js"));
})

gulp.watch("./src/css/*.less", ["nCss"]);
gulp.watch("./src/js/*.js", ["minjs"]);

gulp.task("default", function(cb) {
    squence("server", ["nCss", "minjs"], cb);
});