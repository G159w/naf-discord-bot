import { commands, type MessageResponse } from '$lib/server/commands';
import type { RequestHandler } from './$types';
import {
	InteractionResponseType,
	type APIBaseInteraction,
	InteractionType
} from 'discord-api-types/v10';

export const POST = (async ({ request }) => {
	const message = (await request.json()) as APIBaseInteraction<InteractionType, { name: string }>;

	if (message.type === InteractionType.Ping) {
		return new Response(
			JSON.stringify({
				type: InteractionResponseType.Pong
			})
		);
	} else if (message.type === InteractionType.ApplicationCommand) {
		const command = commands.find((x) => x.register.name === message.data?.name);
		if (!command) return new Response('Unknown command');

		try {
			const commandResponse = await command.execute(
				message as APIBaseInteraction<InteractionType.ApplicationCommand, MessageResponse>
			);
			const jsonResponse = JSON.stringify(commandResponse);
			console.log(jsonResponse);

			// For DEBUG PURPOSE: get info on why the response failed
			// const callback = `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`
			// const response2 = await fetch(callback, { headers: {'content-type': 'application/json'}, method: "POST", body: jsonResponse});
			// console.log(JSON.stringify(await response2.json()))

			return new Response(jsonResponse, { headers: { 'content-type': 'application/json' } });
		} catch (error: unknown) {
			console.log(error);
			return new Response(`Error during execution: ${error}`);
		}
	}

	return new Response('Unknown Type');
}) satisfies RequestHandler;
