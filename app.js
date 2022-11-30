const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors");
app.options("*", cors());
app.use(cors());

let popUpSettings = {}
app.get("/popup-settings", (req, res, next) => {
  try {
    res.status(200).json()({settings: popUpSettings});
  } catch (error) {
    res.status(400).json()({message: "There was an error getting settings"});
  }
});

app.post("/popup-settings", async(req, res) => {
  try {
    const { settings } = req.body
  
    popUpSettings = settings
    res.status(200).json({message: "successful", settings: popUpSettings})
  } catch (error) {
    res.status(400).json()({message: "There was an saving settings"});
  }
})

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
`