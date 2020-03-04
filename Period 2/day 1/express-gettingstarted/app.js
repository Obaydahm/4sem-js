const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

/*

To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

The function signature is:
express.static(root, [options])
The root argument specifies the root directory from which to serve static assets. For more information on the options argument, see express.static.

app.use(express.static('public'))
Now, you can load the files that are in the public directory:
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))