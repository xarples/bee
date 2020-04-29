function format(i: number) {
  return i < 10 ? '0' + i : i
}

export default function getCurrentYYYYMMDDHHmms() {
  const date = new Date()
  return [
    date.getUTCFullYear(),
    format(date.getUTCMonth() + 1),
    format(date.getUTCDate()),
    format(date.getUTCHours()),
    format(date.getUTCMinutes()),
    format(date.getUTCSeconds()),
  ].join('')
}
