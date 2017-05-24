// --------------------------------------------------------------------------------------------------------------------

// core
const fs = require('fs')

// npm
const sass = require('node-sass')

// --------------------------------------------------------------------------------------------------------------------

function log(msg) {
  console.log((new Date()).toISOString() + ' : ' + msg)
}

// --------------------------------------------------------------------------------------------------------------------

log('Building dist/ files')

const opts1 = {
  file        : 'src/page.scss',
  outFile     : 'dist/page.css',
  sourceMap   : true,
  outputStyle : 'expanded',
}

sass.render(opts1, function(err, result) {
  if (err) {
    console.error('' + err)
    return
  }

  log('Expanded file : ' + result.css.length + ' bytes (' + result.stats.duration + 'ms)')
  log('Expanded file included:')
  result.stats.includedFiles.forEach((f) => {
    log(' - ' + f)
  })

  fs.writeFile(opts1.outFile, result.css, log.bind(this, 'Written ' + opts1.outFile))
  fs.writeFile(opts1.outFile + '.map', result.map, log.bind(this, 'Written ' + opts1.outFile + '.map'))
})

const opts2 = {
  file        : 'src/page.scss',
  outFile     : 'dist/page.min.css',
  sourceMap   : true,
  outputStyle : 'compressed',
}

sass.render(opts2, function(err, result) {
  if (err) {
    console.error('' + err)
    return
  }

  log('Compressed file : ' + result.css.length + ' bytes (' + result.stats.duration + 'ms)')
  log('Compressed file included:')
  result.stats.includedFiles.forEach((f) => {
    log(' - ' + f)
  })

  fs.writeFile(opts2.outFile, result.css, log.bind(this, 'Written ' + opts2.outFile))
  fs.writeFile(opts2.outFile + '.map', result.map, log.bind(this, 'Written ' + opts2.outFile + '.map'))
})

// --------------------------------------------------------------------------------------------------------------------
