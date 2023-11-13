const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`APP started on port ${process.env.PORT}`);
});
