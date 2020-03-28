import React from 'react'

export default function BinaryDataImage({data, encoding, alt}) {
  return (
    <img src={`data:image/${encoding};base64,${data}`} alt={alt} />
  )
}
