const express = require('express');
const { addUser, addRankSnapshot, addLegendStat, addGuild } = require('./queries.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 
server.post('/users', async (req, res) => {
  const { discordId, apexIgn, platform } = req.body;
  
  try {
    const user = await addUser(discordId, apexIgn, platform);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
