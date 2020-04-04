import React from 'react'
import { PropTypes } from 'prop-types'

export default function Base64Image({ data, encoding, alt, className }) {
  alt = alt || ''
  return <img className={className} src={`data:image/${encoding};base64,${data}`} alt={alt} />
}

Base64Image.propTypes = {
  data: PropTypes.string.isRequired,
  encoding: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}
