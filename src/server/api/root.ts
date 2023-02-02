import { createTRPCRouter } from './trpc';
import { hauniRouter } from './routers/hauni';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  hauni: hauniRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
