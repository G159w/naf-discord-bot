import { DISCORD_APP_ID, DISCORD_TOKEN } from "$env/static/private";
import { commands } from "$lib/server/commands/commands";
import type { RequestHandler } from './$types';

export const GET = (async () => {
  const guildId = "154965068939919361"
  const response = await fetch(
    `https://discord.com/api/v8/applications/${DISCORD_APP_ID}/guilds/${guildId}/commands`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${DISCORD_TOKEN}`,
      },
      method: "PUT",
      body: JSON.stringify(commands.map(x => x.register)),
    }
  );
  
  if (response.ok) {
    return new Response(JSON.stringify('Registered all commands'));
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
    return new Response(JSON.stringify(text));
  }


}) satisfies RequestHandler;
