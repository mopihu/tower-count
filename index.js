const Command = require('command')
const Vec3 = require('tera-vec3')

module.exports = function TowerCount(dispatch) {
  const command = Command(dispatch)

  let destroyedTowers = {}

  dispatch.hook('S_DESTROY_GUILD_TOWER', 1, (event) => {
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

  this.destructor = function() {
    command.remove('towers')
  }
}
