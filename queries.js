

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

module.exports = { addUser, addRankSnapshot  };