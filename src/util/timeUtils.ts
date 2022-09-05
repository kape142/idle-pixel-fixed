export const timeSince = (timestamp: Date | string) => {
  const parsedTimestamp = new Date(timestamp)
  const now = new Date()
  const secs = (now.getTime() - parsedTimestamp.getTime()) / 1000
  if(secs < 60 )
    return `${Math.floor(secs)}s`
  const mins = (now.getTime() - parsedTimestamp.getTime()) / 60_000
  if(mins < 60)
    return `${Math.floor(mins)}m`
  const hours = (now.getTime() - parsedTimestamp.getTime()) / 3_600_000
  if(hours < 24)
    return `${Math.floor(hours)}h`
  const days = (now.getTime() - parsedTimestamp.getTime()) / 86_400_000
  if(days < 365)
    return `${Math.floor(days)}d`
  const years = (now.getTime() - parsedTimestamp.getTime()) / 31_536_000_000
  return `${Math.floor(years)}y`
}

export const formatDate = (timestamp: Date | string) => new Date(timestamp).toLocaleString()
