var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    changed = require("gulp-changed"),
    size = require("gulp-size"),
    sorting = require("postcss-sorting"),
    clean = require("gulp-clean");

gulp.dest(function(file){
  return path.join(build_dir, path.dirname(file.path));
});

gulp.task("clean", function () {
  return gulp.src('./public', {read: false})
    .pipe(clean());
});

gulp.task("html", function() {
  return gulp.src(["./src/*.html", "./src/**/*.html"])
    .pipe(gulp.dest("public/"));
});

gulp.task("javascript", function() {
  return gulp.src(["./src/*.html", "./src/**/*.html"])
    .pipe(gulp.dest("public/"));
});

gulp.task("images", function() {
  return gulp.src(["./src/images/*"])
    .pipe(gulp.dest("public/images/"));
});

gulp.task("css", function () {
    var postcss    = require("gulp-postcss");
    //var sourcemaps = require("gulp-sourcemaps");

    return gulp.src("src/**/*.css")
      //.pipe( sourcemaps.init() )
      .pipe( postcss([
        sorting({ "sort-order": "alphabetical" }),
        require("autoprefixer"),
        require("postcss-nested"),
        require("precss"),
        require('postcss-partial-import')()
      ]) )
      //.pipe( sourcemaps.write(".") )
      .pipe( gulp.dest("public/") );
});

gulp.task("js", function() {
  return gulp.src(["./src/*.js", "./src/**/*.js"])
    .pipe(gulp.dest("public/"));
});

gulp.task("browser-sync", ["html","css","js"], function() {
  browserSync({
    server: {
      baseDir: "./public/",
      injectChanges: true,
      files: ["./public/**/*"],
    }
  });
});

gulp.task("watch", function() {
  // Watch .html files
  gulp.watch("src/*.html", ["html", browserSync.reload]);
  gulp.watch("src/**/*.html", ["html", browserSync.reload]);
  gulp.watch("src/**/*.css", ["css", browserSync.reload]);
  gulp.watch("src/**/*.js", ["js", browserSync.reload]);
  gulp.watch("src/images/*", ["images", browserSync.reload]);
});

gulp.task("default", ["html","js","css","images","browser-sync","watch"]);
