import buildUrl from "cloudinary-build-url"

const transformations = {
  resize: {
    type: "fill",
    width: 250,
    height: 250,
  },
}

export const getBuildThumbUrl = (public_id?: string) => {
  return public_id
    ? buildUrl(public_id, {
        transformations,
        cloud: {
          cloudName: "woufu",
        },
      })
    : "/noimage.png"
}
