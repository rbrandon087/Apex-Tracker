const pool = require('./db');

pool.query("INSERT INTO users (discord_id, apex_ign, platform) VALUES ('123456789', 'Playerplayer', 'PC')", (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);  
    } else {
        console.log('Query executed successfully');
    }
});