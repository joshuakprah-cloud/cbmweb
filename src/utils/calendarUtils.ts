export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url?: string;
}

export function formatDateTimeForCalendar(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${formatDateTimeForCalendar(event.startDate)}/${formatDateTimeForCalendar(event.endDate || event.startDate)}`,
  });

  if (event.url) {
    params.append('url', event.url);
  }

  return `${baseUrl}?${params.toString()}`;
}

export function generateAppleCalendarUrl(event: CalendarEvent): string {
  const startDate = formatDateTimeForCalendar(event.startDate);
  const endDate = formatDateTimeForCalendar(event.endDate || event.startDate);
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  const encoded = btoa(unescape(encodeURIComponent(icsContent)));
  return `data:text/calendar;charset=utf8;base64,${encoded}`;
}

export function generateOutlookCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
  const params = new URLSearchParams({
    subject: event.title,
    body: `${event.description}\n\nLocation: ${event.location}`,
    startdt: new Date(event.startDate).toISOString(),
    enddt: new Date(event.endDate || event.startDate).toISOString(),
    location: event.location,
  });

  return `${baseUrl}?${params.toString()}`;
}

export function generateYahooCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://calendar.yahoo.com/';
  const params = new URLSearchParams({
    v: '60',
    view: 'month',
    type: '20',
    title: event.title,
    st: formatDateTimeForCalendar(event.startDate),
    et: formatDateTimeForCalendar(event.endDate || event.startDate),
    desc: event.description,
    in_loc: event.location,
  });

  return `${baseUrl}?${params.toString()}`;
}
