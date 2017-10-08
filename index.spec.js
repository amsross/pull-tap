const test = require('tape')
const { pull, asyncMap, onEnd, values } = require('pull-stream')
const { tap, asyncTap } = require('./')

test('pull-tap', assert => {
  assert.test('tap', assert => {
    let counter = 0
    const inputs = [1, 2]

    pull(
      values(inputs),
      tap(input => counter++),
      onEnd((err, data) => {
        assert.ifError(err, 'no error')
        assert.equal(counter, inputs.length)
        assert.end()
      }))
  })

  assert.test('asyncTap', assert => {
    let counter = 0
    const inputs = [1, 2]
    const asyncTask = asyncMap((data, cb) => {
      counter++
      cb(null, data)
    })

    pull(
      values(inputs),
      asyncTap(input => pull(values([input]), asyncTask)),
      onEnd((err, data) => {
        assert.ifError(err, 'no error')
        assert.equal(counter, inputs.length)
        assert.end()
      }))
  })

  assert.end()
})
