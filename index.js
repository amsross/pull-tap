'use strict'
const { pull, asyncMap, collect, map } = require('pull-stream')

function tap (fn) {
  return map(x => {
    fn(x)
    return x
  })
}

function asyncTap (fn) {
  return asyncMap((x, cb) => pull(
    fn(x),
    collect(() => cb(null, x))))
}

module.exports = {
  tap,
  asyncTap
}
