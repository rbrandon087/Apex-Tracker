

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

module.exports = { addUser };