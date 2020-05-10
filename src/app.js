const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  //const repository = { uuid: "", title: "", url: "", techs: [""], likes: 0 };
  const repository = { id: uuid(), ...request.body, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs, likes } = request.body;

  if (likes && likes > 0) {
    return response.json({ likes: 0 });
  }

  repositories.forEach((element) => {
    //console.log(element);
    if (id == element.id) {
      //console.log(id);
      if (title && title.trim() != "") {
        element.title = title;
      }
      if (url && url.trim() != "") {
        element.url = url;
      }
      if (techs.length > 0) {
        element.techs = techs;
      }
      return response.json(element);
    }
  });
  return response.status(400).json({});
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const index = repositories.findIndex((element) => element.id === id);
  //console.log(index);
  if (index < 0) {
    return response.status(400).json({});
  }
  repositories.splice(index, 1);
  return response.status(204).json({});

  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;
  let likes = 0;
  repositories.forEach((element) => {
    if (element.id == id) {
      element.likes++;
      likes = element.likes;
    }
  });
  console.log(likes);
  if (likes > 0) {
    return response.json({ likes });
  }

  return response.status(400).json({});

  // TODO
});

module.exports = app;
