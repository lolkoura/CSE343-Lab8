const express = require('express');
const app = express();
app.use(express.json());

const posts = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.send('Mini Twitter API - Lab 8');
});

// Upload a post
app.post('/posts', (req, res) => {
    const { title, content } = req.body || {};
    if (typeof title !== 'string' || !title.trim() ||
        typeof content !== 'string' || !content.trim()) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = { id: nextId++, title, content, comments: [] };
    posts.push(post);
    res.status(201).json(post);
});

// Read all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Edit a post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const { title, content } = req.body || {};
    if ((title === undefined && content === undefined) ||
        (title !== undefined && (typeof title !== 'string' || !title.trim())) ||
        (content !== undefined && (typeof content !== 'string' || !content.trim()))) {
        return res.status(400).json({ message: 'Provide a valid title or content' });
    }
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    res.json(post);
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    posts.splice(index, 1);
    res.json({ message: 'Post deleted successfully' });
});

// Add a comment
app.post('/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const { content } = req.body || {};
    if (typeof content !== 'string' || !content.trim()) {
        return res.status(400).json({ message: 'Comment content is required' });
    }
    const comment = { id: post.comments.length + 1, content };
    post.comments.push(comment);
    res.status(201).json(comment);
});

// Read post comments
app.get('/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.comments);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
