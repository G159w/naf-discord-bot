import { InteractionResponseType, InteractionType } from 'discord-api-types/v10';
import type { DiscordCommand, MessageResponse } from './index';

const SitCommand: DiscordCommand<InteractionType.ApplicationCommand, MessageResponse> = {
	register: {
		name: 'assis',
		description: "Donne l'ordre `assis` au chien du Tyran",
		type: 1
	},
	execute: async () => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `:dog: *le gentil petit chien s'assoie* :dog:`
			}
		};
	}
};

const LieDownCommand: DiscordCommand<InteractionType.ApplicationCommand, MessageResponse> = {
	register: {
		name: 'donne',
		description: "Donne l'ordre `coucher` au chien du Tyran",
		type: 1
	},
	execute: async () => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `:dog: *le gentil petit chien se couche* :dog:`
			}
		};
	}
};

const GiveCommand: DiscordCommand<InteractionType.ApplicationCommand, MessageResponse> = {
	register: {
		name: 'coucher',
		description: "Donne l'ordre `donne` au chien du Tyran",
		type: 1
	},
	execute: async () => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `:dog: *le gentil petit chien donne la patte* :dog:`
			}
		};
	}
};

const AttackCommand: DiscordCommand<InteractionType.ApplicationCommand, MessageResponse> = {
	register: {
		name: 'attaque',
		description: "Donne l'ordre `attaque` au chien du Tyran",
		type: 1,
		options: [
			{
				name: 'user',
				description: 'The user to edit',
				type: 6,
				required: true
			}
		]
	},
	execute: async (message) => {
		const targetUser = message.data?.options?.[0].options?.[0] as {
			name: string;
			type: number;
			value: string;
		};
		if (!targetUser) throw 'Unknown order';
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `:dog: **Grrrrr WOUF WOUF** <@${targetUser.value}> :dog:`
			}
		};
	}
};

const orders = [SitCommand, LieDownCommand, GiveCommand, AttackCommand];
const OrderCommand: DiscordCommand<InteractionType.ApplicationCommand, MessageResponse> = {
	register: {
		name: 'ordre',
		description: 'Donner un ordre au chien du Tyran',
		options: orders.map((x) => x.register)
	},
	execute: async (message) => {
		const orderMessage = message.data?.options?.[0];
		if (!orderMessage) throw 'Unknown order';
		const order = orders.find((x) => x.register.name === orderMessage?.name);
		if (!order) throw 'Unknown order';

		return order.execute(message);
	}
};

export default OrderCommand;
