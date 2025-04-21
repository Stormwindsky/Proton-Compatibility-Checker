# Proton-Compatibility-Checker
Stormwindsky community project to evaluate your .exe etc games and software on Linux that are not games &amp; softwares on the Steam platform

# WARNING

This project / website is not affiliated with Valve and ProtonDB, Gamejolt, Itch.io, etc.

# How to Contribute to This Project

This project is open source and we welcome contributions!

## Adding a New Game

1. Edit the `api/games.json` file
2. Add a new entry to the "games" array with the following information:

```json
{
    "name": "Game Name",
    "compatibility": "level (native, platinum, gold, silver, bronze)",
    "recommended_proton": "Recommended Proton version",
    "notes": "Compatibility notes",
    "last_tested": "YYYY-MM-DD",
    "gamejolt_url": "Game Jolt URL if available",
    "steam_url": "Steam URL if available",
    "protondb_url": "ProtonDB URL"
}
