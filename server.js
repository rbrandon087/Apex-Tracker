const express = require('express');
const { addUser, addRankSnapshot, addLegendStat, addGuild, fetchUsers, fetchRankSnapshots, fetchLatestRankSnapshotByUser, fetchLegendStats, fetchGuilds, fetchRankSnapshotsByUser, fetchLegendStatsByUser, fetchUserByDiscordId } = require('./queries.js');
const { lookApexUser } = require('./apexApi.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

//POST endpoints for creating new resources
//create new user with discordId, apexIgn, and platform
server.post('/users', async (req, res) => {
  const { discordId, apexIgn, platform } = req.body;
  try {
    const player = await lookApexUser(apexIgn, platform);
    const user = await addUser(discordId, apexIgn, platform, player.uid);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: err.message });
    } else {
      res.status(404).json({ error: err.message });
    }
  }
});

//POST endpoint for creating a new rank snapshot
//create new rank snapshot with userId, rankPoints, rankTier, and rankDivision
server.post('/rank-snapshots', async (req, res) => {
  const { userId, rankPoints, rankTier, rankDivision } = req.body;
  try {
    const rankSnapshot = await addRankSnapshot(userId, rankPoints, rankTier, rankDivision);
    res.status(201).json(rankSnapshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST endpoint for creating a new legend stat
//create new legend stat with userId, legendName, kills, wins, and matchesPlayed
server.post('/legend-stats', async (req, res) => {
  const { userId, legendName, kills, wins, matchesPlayed } = req.body;
  try {
    const legendStat = await addLegendStat(userId, legendName, kills, wins, matchesPlayed);
    res.status(201).json(legendStat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST endpoint for creating a new guild
//create new guild with discordGuildId and optional notifyChannelId
server.post('/guilds', async (req, res) => {
  const { discordGuildId, notifyChannelId } = req.body;
  try {
    const guild = await addGuild(discordGuildId, notifyChannelId);
    res.status(201).json(guild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET endpoints for fetching resources
//fetch all users
server.get('/users', async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all rank snapshots
server.get('/rank-snapshots', async (req, res) => {
  try {
    const rankSnapshots = await fetchRankSnapshots();
    res.status(200).json(rankSnapshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all legend stats
server.get('/legend-stats', async (req, res) => {
  try {
    const legendStats = await fetchLegendStats();
    res.status(200).json(legendStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all guilds
server.get('/guilds', async (req, res) => {
  try {
    const guilds = await fetchGuilds();
    res.status(200).json(guilds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all rank snapshots for a specific user
server.get('/users/:id/rank-snapshots', async (req, res) => {
  const { id } = req.params;
  try {
    const rankSnapshots = await fetchRankSnapshotsByUser(id);
    res.status(200).json(rankSnapshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch the most recent rank snapshot for a specific user
server.get('/users/:id/rank-snapshots/latest', async (req, res) => {
  const { id } = req.params;
  try {
    const rankSnapshot = await fetchLatestRankSnapshotByUser(id);

    if (!rankSnapshot) {
      res.status(404).json({ error: 'No rank snapshots yet for that user' });
    } else {
      res.status(200).json(rankSnapshot);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all legend stats for a specific user
server.get('/users/:id/legend-stats', async (req, res) => {
  const { id } = req.params;
  try {
    const legendStats = await fetchLegendStatsByUser(id);
    res.status(200).json(legendStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch one user by Discord ID
server.get('/users/discord/:discordId', async (req, res) => {
  const { discordId } = req.params;
  try {
    const user = await fetchUserByDiscordId(discordId);

    if (!user) {
      res.status(404).json({ error: 'No user registered with that Discord ID' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});