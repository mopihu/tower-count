const Command = require('command')
const Vec3 = require('tera-vec3')

module.exports = function TowerCount(dispatch) {
  const command = Command(dispatch)

  let destroyedTowers = {}

  dispatch.hook('S_DESTROY_GUILD_TOWER', 1, {filter:{fake: null}}, (event) => {
    if (destroyedTowers[event.sourceGuildName]) {
      destroyedTowers[event.sourceGuildName] += 1
    } else {
      destroyedTowers[event.sourceGuildName] = 1
    }
  })

  command.add('towers', () => {
    Object.keys(destroyedTowers).sort( (a,b) => destroyedTowers[b] - destroyedTowers[a] ).forEach((guild) => {
      command.message(guild+': '+destroyedTowers[guild])
    })
  })

  command.add('destroy', (name, source, target) => {
    dispatch.toClient('S_DESTROY_GUILD_TOWER', 1, {
      loc: new Vec3(1,2,3),
      sourceGuildId: 123,
      targetGuildId: 345,
      sourceGuildName: source,
      name: name,
      targetGuildName: target
    })
  })

  this.destructor = function() {
    command.remove('towers')
    command.remove('destroy')
  }
}
