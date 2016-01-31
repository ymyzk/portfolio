"use strict";

var argv = require("yargs").argv;
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var eslint = require("gulp-eslint");
var gulp = require("gulp");
var gulpif = require("gulp-if");
var sass = require("gulp-sass");

const PRODUCTION = !!argv.production;

const OUTPUT = "output/";
const STATIC = "static/";

gulp.task("scss", () =>
  gulp.src(`${STATIC}stylesheets/**/*.scss`)
    .pipe(sass({
      outputStyle: PRODUCTION ? "compressed" : "expanded",
      sourceComments: !PRODUCTION
    }))
    .pipe(autoprefixer({
      browsers: [
        "Last 2 versions",
        // Bootstrap
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ]
    }))
    .pipe(gulpif(PRODUCTION, cssnano()))
    .pipe(gulp.dest(`${OUTPUT}stylesheets/`))
);

gulp.task("eslint", () =>
  gulp.src(
    [
      "gulpfile.js"
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("stylesheets", ["scss"]);

gulp.task("build", ["stylesheets"]);
gulp.task("test", ["eslint"]);

gulp.task("default", ["build"]);
