const test = require('ava')

const { systemLogger, LogLevel } = require('../../dist/internal')

test('Log Level', (t) => {
  const originalDebug = console.debug

  const debugLogs = []
  console.debug = (...message) => debugLogs.push(message)

  systemLogger.debug('hello!')
  t.is(debugLogs.length, 0)

  systemLogger.withLogLevel(LogLevel.Debug).debug('hello!')
  t.is(debugLogs.length, 1)

  systemLogger.withLogLevel(LogLevel.Log).debug('hello!')
  t.is(debugLogs.length, 1)

  console.debug = originalDebug
})

test('Fields', (t) => {
  const originalLog = console.log
  const logs = []
  console.log = (...message) => logs.push(message)
  systemLogger.withError(new Error('boom')).withFields({ foo: 'bar' }).log('hello!')
  t.is(logs.length, 1)
  t.is(logs[0][0], '__nfSystemLog')
  const log = JSON.parse(logs[0][1])
  t.is(log.msg, 'hello!')
  t.is(log.fields.foo, 'bar')
  t.is(log.fields.error, 'boom')
  t.is(log.fields.error_stack.split('\n').length > 2, true)

  console.log = originalLog
})
