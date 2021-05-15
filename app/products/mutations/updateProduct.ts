import { cloudinary } from "app/core/utils/cloudinary"
import { NotFoundError, resolver } from "blitz"
import db from "db"
import { ImageUpload } from "types"
import { UpdateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const productExists = await db.product.findFirst({ where: { id } })

    if (!productExists) throw new NotFoundError()

    const product = await db.product.update({ where: { id }, data })

    if (data.image) {
      await cloudinary.uploader.destroy((productExists.image as ImageUpload).public_id)
    }

    return product
  }
)
