require('dotenv').config();


async function testApex() {
  const url = `https://api.apexlegendsstatus.com/bridge?player=cozlyg&platform=PC`;
  const response = await fetch(url, {
    headers: { Authorization: process.env.APEX_API_KEY }
  });
  const data = await response.json();
  console.log(response.status);
  console.log(Object.keys(data.global.rank));
  const r = data.global.rank;
 console.log(typeof r.rankScore, typeof r.rankDiv, typeof data.global.uid, String(data.global.uid).length);
}

testApex();