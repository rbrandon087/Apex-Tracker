const { fetchActiveUsers, addRankSnapshot } = require('./queries.js');
const { lookApexUser } = require('./apexApi.js');


// Polls active users for their Apex data and stores rank snapshots.
//
async function pollActiveUsers() {
    const activeUsers = await fetchActiveUsers();
    for (const user of activeUsers) {
        try {
            const apexData = await lookApexUser(user.apex_ign, user.platform);
          await addRankSnapshot(user.id, apexData.rankPoints, apexData.rankTier, apexData.rankDivision);
        } catch (err) {
            console.error(`Error fetching Apex data for user ${user.apex_ign}:`, err);
        }
    }
}

pollActiveUsers();