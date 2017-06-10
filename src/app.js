//  TTH.com - Express Basics Course
'use strict';

let express = require('express'),
    posts   = require('./mock/posts.json');

//  JS pattern: turns obj => array
let postsLists = Object.keys(posts).map(function(value) {
    return posts[value];
});

let app = express();

app.use('/static',express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
    let path = req.path;
    res.locals.path = path;
    res.render('index');
});

app.get('/blog/:title?', function(req, res) {
    let title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.render('blog', {posts:postsLists});
    } else {
        let post = posts[title] || {};
        res.render('post', { post: post});
    }
});

app.get('/posts', function(req, res) {
    if (req.query.raw) {
        res.json(posts);
    } else {
        res.json(postsLists);
    }
});

app.listen(3000, function() {
    'use strict';
    console.log("The frontend server is running on port 3000!");
});
