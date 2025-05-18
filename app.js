// app.js - Cấu hình server với Express và Handlebars
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Cấu hình Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Upload file cấu hình
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Dữ liệu giả lập
const hotPosts = [
  { title: "Hot Post 1", description: "Description for hot post 1" },
  { title: "Hot Post 2", description: "Description for hot post 2" }
];
const latestPosts = [
  { title: "New Post 1", description: "Description for new post 1" },
  { title: "New Post 2", description: "Description for new post 2" }
];

// Route chính
app.get('/', (req, res) => res.render('about'));
app.get('/home', (req, res) => res.render('home', { hotPosts, latestPosts }));
app.get('/documents', (req, res) => res.render('documents'));
app.get('/login', (req, res) => res.render('login'));

// Đăng nhập giả lập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'pass') {
    res.redirect('/home');
  } else {
    res.render('login', { error: 'Sai tài khoản hoặc mật khẩu!' });
  }
});

// Upload tài liệu
app.post('/upload', upload.single('document'), (req, res) => {
  res.redirect('/documents');
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`));
