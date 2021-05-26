import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLoanersInput
  extends Pick<Prisma.LoanerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLoanersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: loaners,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.loaner.count({ where }),
      query: (paginateArgs) => db.loaner.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      loaners,
      nextPage,
      hasMore,
      count,
    }
  }
)
