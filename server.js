const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/updateName', (req, res) => {
  const enteredName = req.body.name;

  if (enteredName.trim() !== '') {
    res.json({ message: `Welcome, ${enteredName}!` });
  } else {
    res.json({ message: 'Welcome!' });
  }
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
