const app = require("./src/app");
const PORT = 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
