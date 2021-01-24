echo starting opine server via pm2

pm2 start opine-server.ts --interpreter="deno" --interpreter-args="run --allow-net --allow-read --allow-write"