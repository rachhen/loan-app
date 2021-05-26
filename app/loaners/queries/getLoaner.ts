import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetLoaner = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetLoaner), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const loaner = await db.loaner.findFirst({ where: { id } })

  if (!loaner) throw new NotFoundError()

  return loaner
})
