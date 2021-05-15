import {
  FormControl,
  Box,
  AspectRatio,
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
} from "@chakra-ui/react"
import React, { ChangeEvent, forwardRef, PropsWithoutRef, useState } from "react"
import { useField } from "react-final-form"
import { buildUrl, setConfig } from "cloudinary-build-url"
import { ImageUpload } from "types"
import { Image } from "./Image"

setConfig({ cloudName: "woufu" })

const transformations = {
  resize: {
    type: "fill",
    width: 250,
    height: 250,
  },
}

export interface ImageUploadFieldProps extends PropsWithoutRef<InputProps> {
  name: string
  label?: string
  initialValue?: ImageUpload
}

export const ImageUploadField = forwardRef<HTMLInputElement, ImageUploadFieldProps>(
  ({ name, label, initialValue, ...props }, ref) => {
    const defaultUri = initialValue
      ? buildUrl(initialValue.public_id, { transformations })
      : "/noimage.png"
    const [image, setImage] = useState<any>(defaultUri)
    const {
      meta: { touched, error, invalid, submitError, submitting },
      input: { value, onChange, ...input },
    } = useField(name)

    const onFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      onChange(target.files)
      if (target.files && target.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
          setImage(e.target?.result!)
        }
        reader.readAsDataURL(target.files[0])
      }
    }

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl isInvalid={touched && invalid}>
        <Box position="relative" maxW="250px" borderRadius="md">
          <AspectRatio maxW="250px" ratio={4 / 3} borderRadius="lg" overflow="hidden">
            <Image src={image} alt="naruto" objectFit="cover" />
          </AspectRatio>
          <Box position="absolute" width="100%" bottom="0" bg="blackAlpha.500">
            <FormLabel
              p="2"
              m="0"
              fontSize="xs"
              color="white"
              htmlFor={name}
              textAlign="center"
              _hover={{ cursor: "pointer" }}
            >
              {label}
            </FormLabel>
            <Input
              {...input}
              accept="image/*"
              type="file"
              id={name}
              disabled={submitting}
              onChange={onFileChange}
              display="none"
              {...props}
              ref={ref}
            />
          </Box>
        </Box>
        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

ImageUploadField.defaultProps = {
  label: "Upload Images",
}
