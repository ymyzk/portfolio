"use strict";

const argv = require("yargs").argv;
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass");

const PRODUCTION = !!argv.production;

const PATHS = {
  node: "node_modules/"
};
const OUTPUT = "output/";
const STATIC = "static/";

gulp.task("bootstrap-javascripts", () =>
  gulp.src(`${PATHS.node}bootstrap-sass/assets/javascripts/**`)
    .pipe(gulp.dest(`${OUTPUT}javascripts/`))
);

gulp.task("jquery", () =>
  gulp.src(`${PATHS.node}jquery/dist/**`)
    .pipe(gulp.dest(`${OUTPUT}javascripts/`))
);

gulp.task("scss", () =>
  gulp.src(`${STATIC}stylesheets/**/*.scss`)
    .pipe(sass({
      includePaths: [
        `${PATHS.node}bootstrap-sass/assets/stylesheets`
      ],
      outputStyle: PRODUCTION ? "compressed" : "expanded",
      precision: 8,
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

gulp.task("images", () =>
  gulp.src(`${STATIC}images/**`)
    .pipe(gulp.dest(`${OUTPUT}images/`))
);

gulp.task("misc", () =>
  gulp.src(["robots.txt"].map((path) => STATIC + path))
    .pipe(gulp.dest(`${OUTPUT}`))
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

gulp.task("javascripts", ["bootstrap-javascripts", "jquery"]);
gulp.task("stylesheets", ["scss"]);

gulp.task("build", ["images", "javascripts", "misc", "stylesheets"]);
gulp.task("watch", ["stylesheets"], () => {
  gulp.watch(`${STATIC}stylesheets/**/*.scss`, ["scss"]);
});
gulp.task("test", ["eslint"]);

gulp.task("default", ["build"]);
