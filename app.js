const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const storage = require("node-persist");
app.use(express.json({ limit: "50mb" }));

const cors = require("cors");
app.options("*", cors());
app.use(cors());

app.get("/popup-settings", async (req, res, next) => {
  try {
    await storage.init();
    const popUpSettings = await storage.getItem("popUpSettings") || {};
    // if (!popUpSettings) {
      
    // }

    console.log({popUpSettings});

    res.status(200).json({ settings: popUpSettings });
  } catch (error) {
    res.status(400).json({ message: "There was an error getting settings" });
  }
});

app.post("/popup-settings", async (req, res) => {
  try {
    await storage.init();
    const settings = req.body;

    console.log({settings}, req.body);

    await storage.setItem("popUpSettings", JSON.stringify(settings));
    const popUpSettings = await storage.getItem("popUpSettings");

    console.log({popUpSettings});


    res.status(200).json({ message: "successful", settings: JSON.parse(popUpSettings) });
  } catch (error) {
    console.log({error});
    res.status(400).json({ message: "There was an saving settings" });
  }
});

app.get("/", (req, res) => res.type("html").send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
