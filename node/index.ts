import * as express from 'express';
import * as axios from 'axios';
import * as cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let cache: { data: any; expiry: number } | null = null;

const fetchComments = async () => {
    const currentTime = Date.now();

    if (cache && cache.expiry > currentTime) {
        console.log('Serving from cache');
        return cache.data;
    }

    try {
        console.log('Fetching fresh data');
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=3');
        cache = {
            data: response.data,
            expiry: currentTime + CACHE_DURATION,
        };
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch comments');
    }
};

app.get('/comments', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const name = req.query.q as string | undefined;

        const comments = await fetchComments();

        if (name) {
            const filteredComments = comments.filter((comment: any) =>
                comment.body.toLowerCase().includes(name.toLowerCase())
            );
            res.json(filteredComments);
            return;
        }

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching comments');
    }
});

// Only start server if the file is run directly, not imported in tests
if (require.main === module) {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}

export default app; // Exporting the app for testing
