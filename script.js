const teams = [
    { name: "", members: ["Player 1", "Player 2"], scores: { player1: Array(18).fill(0), player2: Array(18).fill(0) } },
    { name: "", members: ["Player 3", "Player 4"], scores: { player1: Array(18).fill(0), player2: Array(18).fill(0) } },
    { name: "", members: ["Player 5", "Player 6"], scores: { player1: Array(18).fill(0), player2: Array(18).fill(0) } },
    { name: "", members: ["Player 7", "Player 8"], scores: { player1: Array(18).fill(0), player2: Array(18).fill(0) } }
];

function login() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("login-section").classList.remove("visible");
        document.getElementById("team-setup-section").classList.add("visible");
        loadTeamNames();
    } else {
        alert("Please enter a username");
    }
}

function logout() {
    document.getElementById("login-section").classList.add("visible");
    document.getElementById("scoreboard-section").classList.remove("visible");
}

function loadTeamNames() {
    const teamNamesContainer = document.getElementById("team-names");
    teamNamesContainer.innerHTML = "";
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `
            <h3>Team ${index + 1}</h3>
            <input type="text" id="team-name-${index}" placeholder="Enter Team Name">
        `;
        teamNamesContainer.appendChild(teamDiv);
    });
}

function startScoring() {
    teams.forEach((team, index) => {
        const teamName = document.getElementById(`team-name-${index}`).value;
        if (teamName) {
            team.name = teamName;
        } else {
            alert(`Please enter a name for Team ${index + 1}`);
            return;
        }
    });
    document.getElementById("team-setup-section").classList.remove("visible");
    document.getElementById("scoreboard-section").classList.add("visible");
    loadScores();
}

function loadScores() {
    const teamsContainer = document.getElementById("teams");
    teamsContainer.innerHTML = "";
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `
            <h3>${team.name}</h3>
            <p>Members: ${team.members.join(", ")}</p>
            <table>
                <tr>
                    <th>Hole</th>
                    ${[...Array(18)].map((_, i) => `<th>${i + 1}</th>`).join('')}
                </tr>
                <tr>
                    <td>${team.members[0]}</td>
                    ${[...Array(18)].map((_, i) => `<td><input type="number" id="score-${index}-player1-${i}" value="${team.scores.player1[i]}" onchange="updateScore(${index}, 'player1', ${i})"></td>`).join('')}
                </tr>
                <tr>
                    <td>${team.members[1]}</td>
                    ${[...Array(18)].map((_, i) => `<td><input type="number" id="score-${index}-player2-${i}" value="${team.scores.player2[i]}" onchange="updateScore(${index}, 'player2', ${i})"></td>`).join('')}
                </tr>
                <tr>
                    <td>Total</td>
                    <td colspan="18" id="total-${index}">0</td>
                </tr>
            </table>
        `;
        teamsContainer.appendChild(teamDiv);
        updateTotalScore(index);
    });
}

function updateScore(teamIndex, player, hole) {
    const score = document.getElementById(`score-${teamIndex}-${player}-${hole}`).value;
    teams[teamIndex].scores[player][hole] = parseInt(score) || 0;
    updateTotalScore(teamIndex);
}

function updateTotalScore(teamIndex) {
    const totalScore = teams[teamIndex].scores.player1.reduce((acc, score) => acc + score, 0) +
                       teams[teamIndex].scores.player2.reduce((acc, score) => acc + score, 0);
    document.getElementById(`total-${teamIndex}`).innerText = totalScore;
}
