# Apex Ladder

A backend system that tracks Apex Legends ranked progress. Players register through a Discord bot, a background poller records their rank on a schedule, and a REST API serves the history back to the bot.

> Fan-made project. Not affiliated with or endorsed by EA or Respawn. Player data comes from the [Apex Legends Status API](https://apexlegendsstatus.com).

## How it works

```
Discord  ->  Bot (discord.js)  ->  REST API (Express)  ->  PostgreSQL
                                        ^
Poller (scheduled job)  ----------------+--> Apex Legends Status API
```

- **Bot:** slash commands (`/register`, `/rank`) that call the API.
- **API:** the single point of access to the database. It also verifies players with the Apex API when they register.
- **Poller:** every 15 minutes, looks up each registered player and saves a rank snapshot, so history builds over time.
- **Database:** PostgreSQL on Render.

## Tech stack

- **Runtime and language:** Node.js, JavaScript (async/await)
- **API:** Express 5
- **Database:** PostgreSQL (hosted on Render), queried with raw, parameterized SQL through `pg`
- **Bot:** discord.js v14
- **Config:** dotenv, environment variables
- **Hosting:** Render (API and database)

## Features

- Relational schema with four tables and foreign keys
- REST API with routes for users, rank snapshots, legend stats, and guilds
- Registration that looks the player up in the Apex API and stores their permanent ID
- Scheduled poller that saves a snapshot on every cycle
- Discord slash commands: `/ping`, `/register`, `/rank`

## Database schema

| Table | Purpose |
|---|---|
| `users` | Registered players (Discord ID, Apex name, platform, Apex UID) |
| `rank_snapshots` | Point-in-time records of a player's ranked progress |
| `legend_stats` | Per-legend stats for each player |
| `guilds` | Discord servers using the bot |

A snapshot is saved on every poll, even when nothing changed. That keeps the history continuous, so a rank-over-time graph has no gaps.

## API routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/users` | Register a player (looks them up in Apex first) |
| GET | `/users` | List users |
| GET | `/users/discord/:discordId` | Find a user by Discord ID |
| GET | `/users/:id/rank-snapshots` | A user's full rank history |
| GET | `/users/:id/rank-snapshots/latest` | A user's newest snapshot |
| GET | `/users/:id/legend-stats` | A user's legend stats |
| POST / GET | `/rank-snapshots`, `/legend-stats`, `/guilds` | Create and list records |

Status codes are meaningful: `201` created, `404` not found, `409` already registered.

## Live API

The API is deployed on Render's free tier: https://apex-tracker-tqxf.onrender.com

The free tier sleeps after inactivity, so the first request can take about a minute. The bot and poller currently run locally.

## Project structure

```
db.js              shared PostgreSQL connection pool
queries.js         all SQL queries (insert and fetch functions)
apexApi.js         client for the Apex Legends Status API
server.js          Express routes
poller.js          scheduled job that saves rank snapshots
bot.js             Discord bot and slash command handlers
deploy-commands.js registers slash commands with Discord (run once)
```

## Getting started

1. Clone the repo:
```bash
   git clone https://github.com/rbrandon087/Apex-Tracker.git
   cd Apex-Tracker
```
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root with these variables (your own values):
```
   DB_HOSTNAME=
   DB_PORT=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   APEX_API_KEY=
   DISCORD_BOT_TOKEN=
   DISCORD_CLIENT_ID=
   DISCORD_GUILD_ID=
   API_URL=
```
   `API_URL` is optional and defaults to `http://localhost:3000`.
4. Register the slash commands once: `node deploy-commands.js`
5. Start the programs: `node server.js` (API), `node bot.js` (bot), `node poller.js` (poller)

## Design decisions

- **Players are tracked by a permanent ID, not just their name.** Names can change, so registration stores the Apex UID next to the name.
- **Two different "not found" answers.** `/rank` tells an unregistered player to register, and tells a registered player to check back soon, since each needs a different next step.
- **Deferred replies.** Discord allows three seconds to answer a command, so the bot acknowledges immediately and finishes the slower lookup afterward.
- **One failure doesn't stop the poller.** Each player is looked up inside its own `try/catch`.
- **Secrets stay out of the repo.** They live in `.env` locally and in environment variables on the host.

## Roadmap

- Authentication on the API
- Input validation
- Look players up by UID instead of name
- Always-on hosting for the bot and poller

## Why I'm building this

I'm building this to understand how production backend systems are structured: separating the data layer, managing connections and secrets properly, and designing services that communicate through an API rather than directly through the database.
