

const pool = require('./db');
function addUser(discordId, apexIgn, platform) {
 pool.query(`INSERT INTO users (discord_id, apex_ign, platform) VALUES ('${discordId}', '${apexIgn}', '${platform}')`, (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack); 
    } else {
        console.log('User added successfully');
    }
});
}
function addRankSnapshot(userId, rankPoints, rankTier, rankDivision) {
    pool.query(`INSERT INTO rank_snapshots (user_id, rp, rank_tier, rank_division) VALUES ('${userId}', '${rankPoints}', '${rankTier}', '${rankDivision}')`, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Rank snapshot added successfully');
        }
    });
}

function addLegendStat(userId, legendName, kills, wins, matchesPlayed) {
    pool.query(`INSERT INTO legend_stats (user_id, legend_name, kills, wins, matches_played) VALUES ('${userId}', '${legendName}', '${kills}', '${wins}', '${matchesPlayed}')`, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Legend stats added successfully');
        }
    });
}

function addGuild(discordGuildId, notifyChannelId = null) {
  pool.query(
    'INSERT INTO guilds (discord_guild_id, notify_channel_id) VALUES ($1, $2)',
    [discordGuildId, notifyChannelId],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Guild added successfully');
      }
    }
  );
}

module.exports = { addUser, addRankSnapshot, addLegendStat, addGuild };