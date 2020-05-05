import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { useEffect } from 'react'


function useImageStringBuilder(data, encoding) {
  const [string, setString] = useState()

  useEffect(() => {
    setString(`data:image/${encoding};base64,${data}`)
  }, [data, encoding])

  return string
}
export default function Base64Image({ data, encoding, alt, className }) {
  alt = alt || ''

  const string = useImageStringBuilder(data, encoding)

  return (data && encoding) ? <img className={className} src={string} alt={alt} /> : null
}

Base64Image.propTypes = {
  data: PropTypes.string,
  encoding: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
}
