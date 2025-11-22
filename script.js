document.getElementById("tipForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const total = parseFloat(document.getElementById("total_tips").value);
    const bartenders = parseInt(document.getElementById("num_bartenders").value);
    const barbacks = parseInt(document.getElementById("num_barbacks").value);
    const bouncers = parseInt(document.getElementById("num_bouncers").value);

    const bartenderWeight = 1;
    const barbackWeight = 1 / 3;
    const bouncerWeight = 1 / 4;

    const totalWeight =
        bartenders * bartenderWeight +
        barbacks * barbackWeight +
        bouncers * bouncerWeight;

    if (totalWeight <= 0) {
        alert("Please enter valid worker counts.");
        return;
    }

    const tipPerWeight = total / totalWeight;

    const resultsHTML = `
        <h3>Results</h3>
        <p><strong>Bartender:</strong> $${(tipPerWeight * bartenderWeight).toFixed(2)}</p>
        <p><strong>Barback:</strong> $${(tipPerWeight * barbackWeight).toFixed(2)}</p>
        <p><strong>Bouncer:</strong> $${(tipPerWeight * bouncerWeight).toFixed(2)}</p>
    `;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.classList.remove("hidden");
});
