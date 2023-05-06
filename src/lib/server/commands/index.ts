import { DISCORD_PUBLIC_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { verifyKey } from 'discord-interactions';
import type {
	APIBaseInteraction,
	APIInteractionResponse,
	InteractionType
} from 'discord-api-types/v10';
import OrderCommand from './orders';
import { HelloCommand, HelpCommand, InviteCommand } from './basics';

export async function verifyRequest(request: Request) {
	const body = await request.clone().arrayBuffer();
	const signature = request.headers.get('X-Signature-Ed25519');
	const timestamp = request.headers.get('X-Signature-Timestamp');

	const isValidRequest = verifyKey(body, signature, timestamp, DISCORD_PUBLIC_KEY);

	if (!isValidRequest) {
		throw error(401, {
			message: 'Bad request signature'
		});
	}
}

interface DiscordCommandOption {
	name: string;
	description: string;
	type?: number;
	required?: boolean;
	options?: DiscordCommandOption[];
}

interface DiscordCommandRegister {
	name: string;
	description: string;
	options?: DiscordCommandOption[];
	type?: number;
}

export interface MessageResponse {
	name: string;
	options?: MessageResponse[];
}

export interface DiscordCommand<Type extends InteractionType, Data> {
	register: DiscordCommandRegister;
	execute: (message: APIBaseInteraction<Type, Data>) => Promise<APIInteractionResponse>;
}

export const commands = [HelloCommand, InviteCommand, HelpCommand, OrderCommand];
