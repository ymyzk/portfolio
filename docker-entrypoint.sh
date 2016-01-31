#!/bin/bash
./node_modules/gulp/bin/gulp.js build --production
python ./run.py
