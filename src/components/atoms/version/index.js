const Version = () => {
  return (
    <div>{process.env.CI_TAG || process.env.CI_COMMIT || 'unknown'}</div>
  )
}

export default Version
