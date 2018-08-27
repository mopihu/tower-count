module.exports = function TowerCount(mod) {
  let destroyedTowers = {};

  mod.hook('S_DESTROY_GUILD_TOWER', 1, (event) => {
    if (destroyedTowers[event.sourceGuildName]) {
      destroyedTowers[event.sourceGuildName] += 1;
    } else {
      destroyedTowers[event.sourceGuildName] = 1;
    }
  })

  mod.command.add('towers', {
    $default() {
      mod.command.message('Usage: /8 towers [guild|raid]');
    },
    guild() {
      print(2);
    },
    raid() {
      print(32);
    },
    $none() {
      print();
    },
  })

  function print(channel) {
    Object.keys(destroyedTowers).sort((a, b) => destroyedTowers[b] - destroyedTowers[a]).forEach((guild, index) => {
      let msg = `${guild}: ${destroyedTowers[guild]}`;
      if (channel) {
        setTimeout(function() {
          mod.send('C_CHAT', 1, {
            channel: channel,
            message: msg,
          });
        }, index * 500);
      } else {
        mod.command.message(msg);
      }
    })
  }

  this.destructor = function() {
    mod.command.remove('towers');
  }
}
