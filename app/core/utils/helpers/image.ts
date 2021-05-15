import * as z from "zod"

export const imageValidate = z
  .object({
    asset_id: z.string(),
    public_id: z.string(),
    version: z.string(),
    version_id: z.string(),
    signature: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
    resource_type: z.string(),
    created_at: z.string(),
    tags: z.array(z.any()),
    bytes: z.number(),
    type: z.string(),
    etag: z.string(),
    placeholder: z.boolean(),
    url: z.string(),
    secure_url: z.string(),
    access_mode: z.string(),
    original_extension: z.string(),
    original_filename: z.string(),
  })
  .nonstrict()
  .optional()
