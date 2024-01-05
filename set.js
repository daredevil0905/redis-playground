const client = require('./client')

async function init() {
  
  /**
   * a Redis set is an unordered collection of unique strings (members). Use set to track unique items, represent relations
   * and perform set operations such as union, intersection, etc.
   */

  // sadd <set> <member1> <member2>
  await client.sadd('keys', '1') // 1 - success
  await client.sadd('keys', '2') // 1 - success
  await client.sadd('keys', '3') // 1 - success
  await client.sadd('keys', '1') // 0 - failed since the member already exists in the set

  // srem <set> <member>
  await client.srem('keys', '1') // removes member from the set if present

  /**
   * sismember <set> <member>
   * checks if the member is present in set or not
   */
  await client.sismember('keys', '2') // 1 - success, member is present in set 'keys'
  await client.sismember('keys', '1') // 1 - success, member is present in set 'keys'

  // scard <set>
  const cardinality = await client.scard('keys') // returns the cardinality of the set
  console.log(cardinality)

}

init()
