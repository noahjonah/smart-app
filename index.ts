import concurrently from "concurrently";

// Run both the server and client concurrently with different colors for their logs
// With single command
concurrently([
  {
    name: "server",
    command: "bun run dev",
    cwd: "packages/server",
    prefixColor: "blue",
  },
  {
    name: "client",
    command: "bun dev",
    cwd: "packages/client",
    prefixColor: "green",
  },
]);
