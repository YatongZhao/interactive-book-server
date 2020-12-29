const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const uuid = require('uuid');

const router = express.Router();

router.get('/book', (req, res) => {
    res.json({
        ...book.chapters[book.book],
        id: book.book
    });
});
router.get('/chapter', (req, res) => {
    res.json(book.chapters[req.query.id]);
});

router.get('/chapter/sub', (req, res) => {
    res.json(req.query.ids.map(id => book.chapters[id]));
});

router.post('/add-chapter', (req, res) => {
    const id = uuid.v4();
    console.log(req.body);
    book.chapters[id] = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        sub: [],
    }
    book.chapters[req.query.id].sub.push({
        id,
        title: req.body.title,
        author: req.body.author,
    });
    console.log(book.chapters[req.query.id].sub);
    res.json({ id });
});

const book = require('./book.json');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening at Http://localhost:${port}`);
});
