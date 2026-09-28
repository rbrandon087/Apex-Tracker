const pool = require('./db');

// Inserts a new user into the users table.
// Takes: discordId, apexIgn, platform (all required).
// Returns: the newly created user row (including its auto-generated id and created_at).
// Throws an error if the insert fails (e.g. duplicate discord_id, or duplicate apex_ign+platform pair).

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

// Inserts a new rank snapshot into the rank_snapshots table.
// Takes: userId, rankPoints, rankTier, rankDivision (all required).
// Returns: the newly created rank snapshot row (including its auto-generated id and created_at).
// Throws an error if the insert fails.

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

// Inserts a new legend stat into the legend_stats table.
// Takes: userId, legendName, kills, wins, matchesPlayed (all required).
// Returns: the newly created legend stat row (including its auto-generated id and created_at).
// Throws an error if the insert fails.

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

// Inserts a new guild into the guilds table.
// Takes: discordGuildId (required), notifyChannelId (optional).
// Returns: the newly created guild row (including its auto-generated id and created_at).
// Throws an error if the insert fails (e.g. duplicate discord_guild_id).

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


// Fetches all users from the users table.
// Takes: no arguments.
// Returns: an array of user rows.
// Throws an error if the query fails.

async function fetchUsers() {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

// Fetches all rank snapshots from the rank_snapshots table.
// Takes: no arguments.
// Returns: an array of rank snapshot rows.
// Throws an error if the query fails.

async function fetchRankSnapshots() {
    try {
        const results = await pool.query('SELECT * FROM rank_snapshots');
        return results.rows;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

module.exports = { addUser, addRankSnapshot, addLegendStat, addGuild, fetchUsers, fetchRankSnapshots };