document.getElementById("tipForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // --- Inputs ---
    const total = parseFloat(document.getElementById("total_tips").value);
    const bartenders = parseInt(document.getElementById("num_bartenders").value);
    const barbacks = parseInt(document.getElementById("num_barbacks").value);
    const bouncers = parseInt(document.getElementById("num_bouncers").value);

    // --- Validation ---
    if (isNaN(total) || total <= 0) {
        alert("Please enter a valid total tip amount.");
        return;
    }

    if (bartenders < 0 || barbacks < 0 || bouncers < 0) {
        alert("Worker counts cannot be negative.");
        return;
    }

    // --- Weights ---
    const positions = [
        { name: "Bartender", count: bartenders, weight: 1 },
        { name: "Barback", count: barbacks, weight: 1 / 3 },
        { name: "Bouncer", count: bouncers, weight: 1 / 4 }
    ];

    // --- Total Weight (only counts active positions) ---
    const totalWeight = positions.reduce((sum, pos) => {
        return sum + pos.count * pos.weight;
    }, 0);

    if (totalWeight <= 0) {
        alert("Please enter at least one worker.");
        return;
    }

    // --- Tip Calculation ---
    const tipPerWeight = total / totalWeight;

    // --- Build Results HTML (hide zero-count positions) ---
    let resultsHTML = `<h3>Results</h3>`;

    positions.forEach(pos => {
        if (pos.count > 0) {
            const perPersonTip = tipPerWeight * pos.weight;
            resultsHTML += `
                <p>
                    <strong>${pos.name}:</strong>
                    $${perPersonTip.toFixed(2)}
                    <span style="opacity: 0.7;">(× ${pos.count})</span>
                </p>
            `;
        }
    });

    // --- Display ---
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.classList.remove("hidden");
});
