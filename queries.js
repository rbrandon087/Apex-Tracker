const pool = require('./db');

async function addUser(discordId, apexIgn, platform) {
    try {
        const result = await pool.query(`INSERT INTO users (discord_id, apex_ign, platform) VALUES ($1, $2, $3) RETURNING *`, [discordId, apexIgn, platform]);
        console.log('User added successfully', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

async function addRankSnapshot(userId, rankPoints, rankTier, rankDivision) {
    try {
        const result = await pool.query(`INSERT INTO rank_snapshots (user_id, rp, rank_tier, rank_division) VALUES ($1, $2, $3, $4) RETURNING *`, [userId, rankPoints, rankTier, rankDivision]);
        console.log('Rank snapshot added successfully', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

async function addLegendStat(userId, legendName, kills, wins, matchesPlayed) {
    try {
        const result = await pool.query(`INSERT INTO legend_stats (user_id, legend_name, kills, wins, matches_played) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [userId, legendName, kills, wins, matchesPlayed]);
        console.log('Legend stats added successfully', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

async function addGuild(discordGuildId, notifyChannelId = null) {
    try {
        const result = await pool.query(
            'INSERT INTO guilds (discord_guild_id, notify_channel_id) VALUES ($1, $2) RETURNING *',
            [discordGuildId, notifyChannelId]
        );
        console.log('Guild added successfully', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

module.exports = { addUser, addRankSnapshot, addLegendStat, addGuild };