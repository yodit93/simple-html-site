import express from 'express'

const app = express()

// TODO: update this so it makes a request to https://jsonplaceholder.typicode.com/comments?postId=3
// and it returns a list of comments that match what the user entered
// Bonus: cache results in memory for 5 mins
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})