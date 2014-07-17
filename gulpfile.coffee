String.prototype.contains = (searchStr) ->
  this.indexOf(searchStr) != -1

_ = require 'lodash'
gulp = require "gulp"
coffee = require 'gulp-coffee'
concat = require "gulp-concat"
rename = require "gulp-rename"
gutil = require "gulp-util"
log = gutil.log
clean = require "gulp-clean"
gulpif = require "gulp-if"
coffeelint = require "gulp-coffeelint"
serve = require "gulp-serve"
open = require "gulp-open"
ignore = require 'gulp-ignore'
es = require 'event-stream'
debug = require 'gulp-debug'
help = require 'gulp-task-listing' #command avail cgulp help (shows all tasks)
ourUtils = require './gulputils'
replace = require 'gulp-replace'
gzip = require 'gulp-gzip'
tar = require 'gulp-tar'
insert = require 'gulp-insert'
mocha = require 'gulp-mocha'
ourPackage = require './package.json'

date = new Date()
header =
"""
/**
 *  #{ourPackage.name}
 *
 * @version: #{ourPackage.version}
 * @author: #{ourPackage.author}
 * @date: #{date.toString()}
 * @license: #{ourPackage.license}
 */
"""
gulp.task "clean_app", ->
  gulp.src(["dist/*.js"
            "dist/*.min.js"
            "dist/*.gz"]
  , read: false)
  .pipe clean()

###
Compile main source
###
gulp.task "build", ->
  gulp.src("src/**/*.coffee",{base: "src"})# only needed if dest is all in the correct order, use for prod
  .pipe(coffeelint())
  .pipe(coffeelint.reporter())
  .pipe(coffee().on('error', log))
  .pipe(ourUtils.onlyDirs(es))
  .pipe(insert.prepend(header))
  .pipe(gulp.dest("dist/src"))
  .pipe(concat("ns2.js"))
  .pipe(gulp.dest("dist"))

gulp.task "scripts", ["build"]

gulp.task 'spec_build', ->
  gulp.src("spec/**/*.coffee",{base: "spec"})
  .pipe(coffeelint())
  .pipe(coffeelint.reporter())
  .pipe(coffee().on('error', log))
  .pipe(ourUtils.onlyDirs(es))
  .pipe(insert.prepend(header))
  .pipe(gulp.dest("dist/spec"))
  .pipe(concat("spec.js"))
  .pipe(gulp.dest("dist"))

gulp.task 'spec', ['spec_build'],->
  gulp.src('dist/spec.js', read: false)
  .pipe mocha( reporter: 'spec')

gulp.task "clean", ->
  gulp.src(['dist', 'build'], read: false)
  .pipe clean()

gulp.task "serve_build", serve
  root: ["dist/public"]
  port: 3000

gulp.task "serve_prod", serve
  root: ["dist/public"]
  port: 80

thingToOpen = ->
  options =
    url: "http://localhost:3000/version.json"
    app: "Google Chrome" #osx , linux: google-chrome, windows: chrome
  gulp.src("")
  .pipe(open("", options))

gulp.task "open_build", ["watch"], ->
  thingToOpen()

gulp.task "open", ["watch_fast"], ->
  thingToOpen()

#BEGIN BASE TASKS

gulp.task "serve_fast", ["serve_build", "open"]

gulp.task "default", ["clean"], ->
  gulp.start "scripts", "watch", "spec"

gulp.task "serve", ["clean"], ->
  gulp.start "default", "serve_fast"

gulp.task('help', help.withFilters(/:/))

thingsToWatch = ->
  gulp.watch "src/**/*", ["default"]
  gulp.watch "spec/**/*", ["spec_build", "spec"]

gulp.task "watch", ["scripts"], ->
  thingsToWatch()

gulp.task "watch_fast", ->
  thingsToWatch()

#BEGIN ALIASES
gulp.task "s", ["serve"]
gulp.task "build_app", ["scripts"]
gulp.task "app_build", ["scripts"]
# gulp.task 'mocks_build', ["build_mocks"]
#END ALIASES

pack = ->
  es.merge(gulp.src(["dist/*.html", "!dist/*.js", "dist/*.min.css", "dist/*.gz", "dist/**/*", "public/*", "public/**/*",
                     "!dist/assets/**"]),
      gulp.src("dist/*.min.js"))#then includ the *.min.js post filter as to not null each other out( !*.js, *.min.js)
  .pipe(ourUtils.onlyDirs(es))

gulp.task "package_dry", ->
  pack()
  .pipe(ourUtils.logFile(es))

gulp.task "package", ["clean_app"], ->
  gulp.start "prod", ->
    pack()
    .pipe(tar("#{ourPackage.name}.tar"))
    .pipe(gzip())
    .pipe(gulp.dest('build/'))
