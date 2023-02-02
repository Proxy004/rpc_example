import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { createTRPCRouter, publicProcedure } from '../trpc';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const hauniRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Der ${input.text}`,
      };
    }),
  picture: publicProcedure.query(() => {
    return {
      link: 'https://www2.hak-bregenz.ac.at/files/hakbregenz/team/personal/img/HAUN.jpg',
    };
  }),
  openai: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const completion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: `You are a person which goes by the name of Hauni and is a network technology specialist. Answer in german.\n Human: ${input.query} \ Hauni:`,
        temperature: 0.9,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.8,
        stop: ['Hauni'],
      });
      return { text: completion?.data?.choices[0]?.text ?? '' };
    }),
});
