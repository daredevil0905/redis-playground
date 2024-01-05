const client = require('./client')

async function init() {

  /**
   * set <key> <value>
   * It is a good convention to keep format of key as: <entity>:<id>
   */

  console.log(await client.set('friends:1', 'Joey Tribbiani')) // OK
  console.log(await client.set('msg:1', 'How you doin?')) // OK

  /************************************************************************************************* */

  /**
   * set has options such as 'nx' and 'xx'
   * nx: set the key if and only if it is not present already.
   * xx: set the key if and only if it is present.
   */

  console.log(await client.setnx('friends:1', 'Chandler Bing')) // 0, failed since the key 'friends:1' already has a value
  console.log(await client.setnx('friends:2', 'Chandler Bing')) // 1, success since the key 'friends:2' does not exist in redis

  /************************************************************************************************* */

  /**
   * get <key>
   */

  console.log(await client.get('friends:1'))

  /************************************************************************************************* */

  /**
   * mget <key1> <key2> ...
   */

  console.log(await client.mget('friends:1', 'friends:2'))

  /************************************************************************************************* */

  /**
   * mset <key1> <value1> <key2> <value2> ...
   */

  await client.mset({
    'friends:3': 'Ross Geller',
    'friends:4': 'Monica Geller',
    'friends:5': 'Phoebe Buffay',
    'friends:6': 'Rachel Green'
  })

}

init()
