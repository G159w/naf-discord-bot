import type { RequestHandler } from './$types';
import { InteractionResponseType, MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';

export const POST = (async ({ request }) => {
    const body = await request.json();

    return new Response(JSON.stringify({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            // Fetches a random emoji to send from a helper function
            content: `Rock papers scissors challenge from <@${body.member?.user?.id}>`,
            components: [
            {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                {
                    type: MessageComponentTypes.BUTTON,
                    // Append the game ID to use later on
                    custom_id: `accept_button_${body.id}`,
                    label: 'Accept',
                    style: ButtonStyleTypes.PRIMARY,
                },
                ],
            },
            ],
        },
    }));

}) satisfies RequestHandler;
