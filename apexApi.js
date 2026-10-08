require('dotenv').config();

// This file contains the API functions for interacting with the Apex Tracker database.
// It provides functions to add and fetch users, rank snapshots, legend stats, and guilds.  

// Looks up a user in the Apex API.
// Takes: apexIgn, platform (both required).
// Returns: an object with uid, rankPoints, rankTier, and rankDivision.

async function lookApexUser(apexIgn, platform) {
 const url = `https://api.apexlegendsstatus.com/bridge?player=${apexIgn}&platform=${platform}`;
 try {
    const response = await fetch(url, {
            headers: { Authorization: process.env.APEX_API_KEY }
    });
    const data = await response.json();
    console.log(response.status, data.Error);
    return {
        uid: data.global.uid,
        rankPoints: data.global.rank.rankScore,
        rankTier: data.global.rank.rankName,
        rankDivision: data.global.rank.rankDiv
    };
 } catch (err) {
    console.error('Error fetching Apex user data', err);
    throw err;
 }
}

module.exports = { lookApexUser };