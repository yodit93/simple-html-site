import request from 'supertest';
import app from '../node/index'; // Adjust the path as necessary
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /comments', () => {
    const mockComments = [
        { id: 1, postId: 3, body: 'First comment body' },
        { id: 2, postId: 3, body: 'Second comment body' },
    ];

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: mockComments,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                url: '/comments',
                method: 'get',
                headers: {},
            },
        }); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all comments when no query is provided', async () => {
        const response = await request(app).get('/comments');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComments);
    });

    it('should return filtered comments based on query', async () => {
        const response = await request(app).get('/comments?q=First');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, postId: 3, body: 'First comment body' }]);
    });

    it('should return an empty array if no comments match the query', async () => {
        const response = await request(app).get('/comments?q=Nonexistent');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});
