const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const storage = require("node-persist");
app.use(express.json({ limit: "50mb" }));
var path = require('path');
var mime = require('mime');
var fs = require('fs');

const cors = require("cors");
app.options("*", cors());
app.use(cors());

app.get("/cdn", async (req, res, next) => {
  try {
      var file = __dirname + '/assets/popup.js';
    
      var filename = path.basename(file);
      var mimetype = mime.lookup(file);
    
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);
    
      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
    } catch (error) {
    console.log({error});
    res.status(400).json({ message: "There was an error getting settings" });
  }
});

app.get("/popup-settings", async (req, res, next) => {
  try {
    await storage.init();
    const popUpSettings = (await storage.getItem("popUpSettings")) || {};

    res.status(200).json({ settings: popUpSettings });
  } catch (error) {
    res.status(400).json({ message: "There was an error getting settings" });
  }
});

app.post("/popup-settings", async (req, res) => {
  try {
    await storage.init();
    const settings = req.body;

    await storage.setItem("popUpSettings", JSON.stringify(settings));
    const popUpSettings = await storage.getItem("popUpSettings");

    res
      .status(200)
      .json({ message: "successful", settings: JSON.parse(popUpSettings) });
  } catch (error) {
    res.status(400).json({ message: "There was an saving settings" });
  }
});

app.get("/", (req, res) => res.type("html").send(html));

app.listen(port, () => console.log(`listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
  <body>
    <section>
      Hello from Node!
    </section>
  </body>
</html>
`;
