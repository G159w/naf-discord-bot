import { DISCORD_PUBLIC_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { verifyKey } from "discord-interactions";

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