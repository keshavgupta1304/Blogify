import express from "express"
import bodyParser from "body-parser" 
import methodOverride from 'method-override';
const app = express();
const port = 3000;
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [

];

app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  
  const postId = posts.length + 1;
  
  const newPost = { id: postId, title: title, content: content };
  
  posts.push(newPost);
  
  res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('show', { post: post });
});

app.get('/posts/:id/edit', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('edit', { post: post });
});

app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  
  posts[postIndex].title = title;
  posts[postIndex].content = content;
  
  res.redirect('/');
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
