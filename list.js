const client = require('./client')

async function stack() {
  /**
   * We can use the Redis List data type to implement a stack. If we push from the left end, and pop from the left end,
   * the resulting data structure will resemble a stack (last in, first out)
   */

  await client.lpush('stack', 'Hello')
  await client.lpush('stack', 'Hi')
  await client.lpush('stack', 'Redis playground')

  let result = await client.lpop('stack')
  console.log(result) // Redis playground

  result = await client.lpop('stack')
  console.log(result) // Hi

}

async function queue() {
  /**
   * We can use the Redis List data type to implement a queue. If we push from the left end, and pop from the right end,
   * the resulting data structure will resemble a queue (first in, first out)
   */

  await client.lpush('queue', 'Hello')
  await client.lpush('queue', 'Hi')
  await client.lpush('queue', 'Redis playground')

  let result = await client.rpop('queue')
  console.log(result) // Hello

  result = await client.rpop('queue')
  console.log(result) // Hi

}

async function init() {

  // Call the stack function to see stack functionality
  // await stack()

  // Call the queue function to see queue functionality
  // await queue()

  /** 
   * blpop: Blocking left pop. This applies the lpop in blocking mode. This means that if you are popping from an empty list
   * then the lpop operation will stop there until there is an element in the list to pop OR the expiry time set for this operation
   * runs out.
  */
  
  await client.lpush('blockingStack', '1st entry')
  let result = await client.lpop('blockingStack')
  console.log(result)

  /**
   * The following operation will be blocked for 60s. If an element is added to blockingStack within the 60s time, then it will
   * be popped and returned to 'result'. Otherwise the operation will time out after 60s
   */
  result = await client.blpop('blockingStack', 60)
  console.log(result)

  /**
   * Use lrange to read the list. 0 is the start and -1 signifies the end.
   */

}

init()
