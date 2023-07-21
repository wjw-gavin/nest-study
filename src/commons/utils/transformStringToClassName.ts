export function transformStringToClassName(str: string): string {
  if (!str) return
  const words = str.split('_')
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join('')
}
