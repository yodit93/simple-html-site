document.getElementById('search-input')?.addEventListener('keyup', async (e) => {
    // Search comments
    // ---
    // Use this API (node/index.ts): http://localhost:3000/
    // Display the results in the UI

    // Things to look out for
    // ---
    // Use es6
    // Strongly typed
    const res = await fetch('http://localhost:3001/')
    const json = await res.json()

    const result = `<li>${json.join('</li><li>')}</li>`
    const $results = document.getElementById('results')
    if ($results) {
        $results.innerHTML = result
    }
})