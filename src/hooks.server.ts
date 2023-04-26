import type { Handle } from '@sveltejs/kit';
import { verifyRequest } from "$lib/server/commands"

export const handle = (async ({ event, resolve }) => {
  console.log(event.url.pathname)
  if (event.url.pathname.startsWith('/command')) {
    await verifyRequest(event.request)
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;