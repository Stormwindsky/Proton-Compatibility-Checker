// Make functions available globally
window.searchGame = searchGame;
window.showGameDetails = showGameDetails;
window.loadRecentGames = loadRecentGames;

// Games database
const gamesDatabase = {
    "games": [
        {
            "name": "Melvore's School of Puzzles and FUN!",
            "compatibility": "gold",
            "recommended_proton": "Proton Stable",
            "notes": "Works well i think lol.",
            "last_tested": "2023-11-15",
            "official_url": "https://gamejolt.com/games/melvoresschoolofpuzzlesandfun/883145",
        },
        {
            "name": "Stardew Valley",
            "compatibility": "native",
            "recommended_proton": "Native Linux Version",
            "notes": "Native version available, no Proton needed. Works perfectly.",
            "last_tested": "2023-10-01",
            "gamejolt_url": "https://gamejolt.com/games/stardew-valley/example",
            "protondb_url": "https://www.protondb.com/app/413150"
        },
        {
            "name": "Among Us",
            "compatibility": "gold",
            "recommended_proton": "Proton 6.3",
            "notes": "Works well but may have issues with some servers.",
            "last_tested": "2023-08-15",
            "gamejolt_url": "https://gamejolt.com/games/among-us/409020",
            "protondb_url": "https://www.protondb.com/app/945360"
        }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', searchGame);
    loadRecentGames();
});

function searchGame() {
    const searchTerm = document.getElementById('gameSearch').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (searchTerm.length < 2) {
        return;
    }

    const matchedGames = gamesDatabase.games.filter(game => 
        game.name.toLowerCase().includes(searchTerm)
    ).slice(0, 5);

    if (matchedGames.length === 0) {
        resultsContainer.innerHTML = '<div class="alert alert-info">No games found</div>';
        return;
    }

    matchedGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'search-item';
        gameElement.textContent = game.name;
        gameElement.onclick = function() { 
            showGameDetails(game); 
        };
        resultsContainer.appendChild(gameElement);
    });
}

function showGameDetails(game) {
    document.getElementById('noResults').classList.add('d-none');
    const resultDiv = document.getElementById('compatibilityResult');
    resultDiv.classList.remove('d-none');

    document.getElementById('gameTitle').textContent = game.name;
    
    const badge = document.getElementById('compatibilityLevel');
    badge.textContent = getCompatibilityText(game.compatibility);
    badge.className = 'badge ' + getCompatibilityClass(game.compatibility);
    
    document.getElementById('recommendedProton').textContent = game.recommended_proton;
    document.getElementById('compatibilityNotes').textContent = game.notes;
    document.getElementById('lastTested').textContent = game.last_tested;

    // Set up links
    const officialLink = document.getElementById('officialLink');
    const protondbLink = document.getElementById('protondbLink');

    // Set official link (prioritize Game Jolt if available)
    if (game.gamejolt_url) {
        officialLink.href = game.gamejolt_url;
        officialLink.textContent = 'Visit Game Jolt';
        officialLink.style.display = 'inline-block';
    } else if (game.official_url) {
        officialLink.href = game.official_url;
        officialLink.textContent = 'Go to Visit';
        officialLink.style.display = 'inline-block';
    } else {
        officialLink.style.display = 'none';
    }

    // Set ProtonDB link if available
    if (game.protondb_url) {
        protondbLink.href = game.protondb_url;
        protondbLink.style.display = 'inline-block';
    } else {
        protondbLink.style.display = 'none';
    }
}

function loadRecentGames() {
    const recentGamesContainer = document.getElementById('recentGames');
    recentGamesContainer.innerHTML = '';

    // Get last 6 games
    const recentGames = [...gamesDatabase.games].reverse().slice(0, 6);

    recentGames.forEach(game => {
        const gameCol = document.createElement('div');
        gameCol.className = 'col-md-4 col-sm-6 mb-4';
        
        gameCol.innerHTML = `
            <div class="card game-card h-100" data-game='${JSON.stringify(game).replace(/'/g, "\\'")}'>
                <div class="card-body">
                    <h5 class="card-title">${game.name}</h5>
                    <span class="badge ${getCompatibilityClass(game.compatibility)}">
                        ${getCompatibilityText(game.compatibility)}
                    </span>
                    <p class="card-text mt-2"><small>Proton: ${game.recommended_proton}</small></p>
                </div>
            </div>
        `;
        
        recentGamesContainer.appendChild(gameCol);
    });

    // Add click event to all game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameData = JSON.parse(this.getAttribute('data-game'));
            showGameDetails(gameData);
        });
    });
}

// Helper functions
function getCompatibilityText(level) {
    const levels = {
        'native': 'Native Linux',
        'platinum': 'Platinum',
        'gold': 'Gold',
        'silver': 'Silver',
        'bronze': 'Bronze',
        'unknown': 'Unknown'
    };
    return levels[level] || level;
}

function getCompatibilityClass(level) {
    const classes = {
        'native': 'badge-native',
        'platinum': 'badge-platinum',
        'gold': 'badge-gold',
        'silver': 'badge-silver',
        'bronze': 'badge-bronze',
        'unknown': 'badge-unknown'
    };
    return classes[level] || 'badge-secondary';
}
