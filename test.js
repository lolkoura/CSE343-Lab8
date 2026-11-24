const assert = require('node:assert/strict');
const base = process.env.API_URL || 'http://localhost:3000';
async function request(method, path, body, expected) {
    const response = await fetch(base + path, {
        method,
        ...(body === undefined ? {} : {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    });
    assert.equal(response.status, expected);
    const data = await response.json();
    console.log(`${method} ${path}: ${response.status} PASS`);
    return data;
}
async function run() {
    const post = await request('POST', '/posts', {title: 'First post', content: 'Hello Twitter'}, 201);
    const path = `/posts/${post.id}`;
    const updated = await request('PUT', path, {title: 'Updated post'}, 200);
    assert.equal(updated.title, 'Updated post');
    const posts = await request('GET', '/posts', undefined, 200);
    assert(posts.some(p => p.id === post.id && p.title === 'Updated post'));
    const comment = await request('POST', path + '/comments', {content: 'Nice post!'}, 201);
    const comments = await request('GET', path + '/comments', undefined, 200);
    assert.deepEqual(comments, [comment]);
    await request('DELETE', path, undefined, 200);
    await request('GET', path + '/comments', undefined, 404);
    console.log('All six endpoints and missing-post check passed.');
}
run().catch(err => { console.error(err); process.exitCode = 1; });
