import { DISCORD_APP_ID } from '$env/static/private';
import { InteractionResponseType, MessageFlags, InteractionType } from 'discord-api-types/v10';
import type { DiscordCommand } from './index';

export const HelloCommand: DiscordCommand<InteractionType.ApplicationCommand, unknown> = {
	register: {
		name: 'wouf',
		description: 'Health check command interaction'
	},
	execute: async (message) => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `:dog: **Wouf, Wouf** <@${message.member?.user.id}>`
			}
		};
	}
};

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_APP_ID}&scope=applications.commands`;
export const InviteCommand: DiscordCommand<InteractionType.ApplicationCommand, unknown> = {
	register: {
		name: 'invite',
		description: 'Get an invite link to add the bot to your server'
	},
	execute: async () => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				flags: MessageFlags.Ephemeral,
				content: `
:feet: :feet: Je vous ramène lien d'invitation: ${INVITE_URL},
Cordialement **Wouf** :dog:
`
			}
		};
	}
};

export const HelpCommand: DiscordCommand<InteractionType.ApplicationCommand, unknown> = {
	register: {
		name: 'help',
		description: 'Bot / server information'
	},
	execute: async () => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				flags: MessageFlags.Ephemeral,
				content: `
:dog: :mega:  Gloire au grand Maître <@154964984558780416> ** Wouf, Wouf ** :mega: :dog:

Pour la liste des commandes, Discord te montre la liste quand tu rentres '/'

Sinon, voici les liens importants du serveur:
https://naf-series.vercel.app --> Séries vues et notées par la NAF
https://nafurf.vercel.app --> Les stats le NAF en URF
					`
			}
		};
	}
};
