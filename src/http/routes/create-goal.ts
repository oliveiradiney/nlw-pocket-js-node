import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (request, response) => {
      try {
        const { title, desiredWeeklyFrequency } = request.body
        await createGoal({
          title,
          desiredWeeklyFrequency,
        })

        response
          .code(200)
          .send({ success: true, message: 'Goal created successfully' })
      } catch (error) {
        response
          .code(500)
          .send({ success: false, message: 'Internal Server Error' })
      }
    }
  )
}
