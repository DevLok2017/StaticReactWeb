function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function downloadIcsFile(options: {
  title: string
  description?: string
  location?: string
  start: string
  end?: string
  filename?: string
}): void {
  const start = new Date(options.start)
  const end = options.end ? new Date(options.end) : new Date(start.getTime() + 3 * 60 * 60 * 1000)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${options.title}`,
    options.description ? `DESCRIPTION:${options.description.replace(/\n/g, '\\n')}` : '',
    options.location ? `LOCATION:${options.location}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = options.filename ?? 'wedding-invitation.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
