# Apex Tracker

A backend system for tracking Apex Legends ranked progress and legend stats, built to eventually power a Discord bot for gaming communities.

> 🚧 **Status: In active development.** The database layer is complete; the Express API is in progress.

## Overview

Apex Tracker stores player rank history and legend stats in a PostgreSQL database. The long-term design has a central API that multiple services talk to:

- **Discord bot**: lets users check ranks and stats from their server
- **Data poller**: periodically pulls fresh stats and saves snapshots
- **Central API (Express)**: the single point of access to the database

## Tech Stack

- **Runtime:** Node.js
- **Database:** PostgreSQL (hosted on Render)
- **Libraries:** `pg`, `dotenv`
- **Coming soon:** Express.js, Discord.js

## Database Schema

| Table            | Purpose                                             |
|------------------|-----------------------------------------------------|
| `users`          | Tracked players                                     |
| `rank_snapshots` | Point-in-time records of a player's ranked progress |
| `legend_stats`   | Per-legend stats for each player                    |
| `guilds`         | Discord servers using the bot                       |

## Project Structure


## Current Features

- [x] Relational schema with four live tables
- [x] Shared connection pool for efficient database access
- [x] Insert functions: `addUser`, `addRankSnapshot`, `addLegendStat`, `addGuild`
- [x] All inserts tested against a live Render Postgres instance
- [ ] Express REST API
- [ ] Discord bot integration
- [ ] Scheduled data poller

## Getting Started

1. Clone the repo:
```bash
   git clone https://github.com/rbrandon087/Apex-Tracker.git
   cd Apex-Tracker
```
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root with your database connection string:

4. ## Why I'm Building This

I'm building this to understand how production backend systems are structured: separating the data layer, managing connections and secrets properly, and designing services that communicate through an API rather than directly through the database.
