const express = require('express');
const app = express();
const port = 5000;
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Intently listening on port ${port}`);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
