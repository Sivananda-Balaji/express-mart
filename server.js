const app = require("./app");
const mongoose = require("mongoose");
const { PORT } = require("./configs/server.config");
const { DB_URL } = require("./configs/db.config");

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
