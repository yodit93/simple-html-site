interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

let debounceTimeout: NodeJS.Timeout;

document.getElementById('search-input')?.addEventListener('keyup', async (e) => {
    const searchInput = e.target as HTMLInputElement;

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
        try {
            const query = searchInput.value;
            const $results = document.getElementById('results');
            if (!query) {
                if ($results) {
                    $results.innerHTML = '';
                }
                return;
            }
            const res = await fetch(`http://localhost:3001/comments?q=${encodeURIComponent(query)}`);
            
            if (!res.ok) {
                throw new Error('Failed to fetch comments');
            }

            const json: Comment[] = await res.json();
            
            const result = json.map(comment => `<li>${comment.body}</li>`).join('');

            if ($results) {
                $results.innerHTML = result || '<li>No results found</li>';
            }
        } catch (error) {
            console.error(error);
            const $results = document.getElementById('results');
            if ($results) {
                $results.innerHTML = '<li>Error fetching comments</li>';
            }
        }
    }, 100);
});
