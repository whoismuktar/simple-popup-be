const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

let popUpSettings = {}
app.get("/popup-settings", (req, res, next) => {
  res.json(popUpSettings);
});

app.post("/popup-settings", async(req, res) => {
  const { settings } = req.body

  popUpSettings = settings
  res.json({message: "successful", settings: popUpSettings})
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