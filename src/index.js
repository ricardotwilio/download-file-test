import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send({ message: 'Hello!' })
});

app.get('/download', function (req, res) {
  return axios({
    method: 'get',
    url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.3gp',
    responseType: 'stream'
  }).then(response => {
    response.data.pipe(res);
  }).catch(console.log);
});


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
