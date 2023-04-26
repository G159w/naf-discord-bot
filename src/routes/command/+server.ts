import { commands } from '$lib/server/commands/commands';
import type { RequestHandler } from './$types';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

export const POST = (async ({ request }) => {
  const message = await request.clone().json() as { type: InteractionType; data: { name: string }, token: string, id: string };

  const callback = `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`
  if (message.type === InteractionType.PING) {
    
    return new Response(JSON.stringify({
      type: InteractionResponseType.PONG,
    }));
  
  } else if (message.type === InteractionType.APPLICATION_COMMAND) {
   
    const command = commands.find(x => x.register.name === message.data.name);
    if (!command) return new Response('Unknown command');
   
    const commandResponse = await command.execute(request);
    const jsonResponse = JSON.stringify(commandResponse);
    console.log(jsonResponse);

    //const response2 = await fetch(callback, { headers: {'content-type': 'application/json'}, method: "POST", body: jsonResponse});
    //console.log(JSON.stringify(await response2.json()))
    
    return new Response(jsonResponse, { headers: {'content-type': 'application/json'} })
  }

  return new Response('Unknown Type');
}) satisfies RequestHandler;
