import { DISCORD_APP_ID } from "$env/static/private";
import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

interface DiscordCommandRegister {
	name: string;
	description: string;
	options?: {
		name: string;
		description: string;
		type: number,
		required: boolean;
	}[];
}

interface DiscordCommand {
	register: DiscordCommandRegister
	execute: (request: Request) => Promise<unknown>
}

const HelloCommand: DiscordCommand = {
	register:  {
		name: "hello",
		description: "Ping / Pong command interaction",
	},
	execute: async (request) => {
		const body = await request.json();
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Salut <@${body.member?.user?.id}>`,
        },
    };
	}
}

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_APP_ID}&scope=applications.commands`;
export const InviteCommand: DiscordCommand = {
	register:  {
  	name: "help",
  	description: "Bot information and list of all commands",
	},
	execute: async () => {
    return {
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
					flags: InteractionResponseFlags.EPHEMERAL,
					content: INVITE_URL,
        },
    };
	}
};

export const commands = [HelloCommand, InviteCommand];