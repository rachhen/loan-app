import { cloudinary } from "app/core/utils/cloudinary"
import { resolver } from "blitz"
import db from "db"
import { ImageUpload } from "types"
import { DeleteProduct } from "../validations"

export default resolver.pipe(resolver.zod(DeleteProduct), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.delete({ where: { id } })

  if (product && product.image) {
    await cloudinary.uploader.destroy((product.image as ImageUpload).public_id)
  }

  return product
})
