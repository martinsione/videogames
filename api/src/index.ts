import "dotenv/config";
import server from "./app";
import { dbSync } from "./db";

const PORT = process.env.PORT || 5000;

dbSync()
  .then(() => console.log("Database synced"))
  .catch((e) => console.log("Error syncing database: ", e));

server.listen(PORT, () => console.log(`Listening at ${PORT}`));
