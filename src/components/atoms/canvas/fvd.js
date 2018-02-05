const STYLES = {
  n: '',
  i: 'italic',
  o: 'oblique',
}

const STRETCH = {
  a: 'ultra-condensed',
  b: 'extra-condensed',
  c: 'condensed',
  d: 'semi-condensed',
  n: '',
  e: 'semi-expanded',
  f: 'expanded',
  g: 'extra-expanded',
  h: 'ultra-expanded',
}

const VARIANT = {
  n: '',
  c: 'small-caps',
}

export const parse = (fvd) => {
  const [name, descriptor] = fvd.split(':')

  const props = {
    style: STYLES.n,
    weight: 400,
    stretch: STRETCH.n,
    variant: VARIANT.n,
  }

  if (descriptor.length > 0) {
    props.style = STYLES[descriptor.charAt(0).toLowerCase()]
  }
  if (descriptor.length > 1) {
    props.weight = parseInt(descriptor.charAt(1), 10) * 100
  }
  if (descriptor.length > 2) {
    props.stretch = STRETCH[descriptor.charAt(2).toLowerCase()]
  }
  if (descriptor.length > 3) {
    props.variant = VARIANT[descriptor.charAt(3).toLowerCase()]
  }

  return { name, props }
}

export const expression = (fvd, size) => {
  const { name, props } = fvd
  return `${props.weight} ${props.style} ${props.variant} ${size}px ${name}`
}
