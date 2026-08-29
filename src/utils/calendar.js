// Helper to create and download .ics iCalendar file for Griha Pravesh
export function downloadCalendarEvent(eventData) {
  const { title, description, location, startDate, endDate } = eventData;

  const formatDate = (dateObj) => {
    return dateObj.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const startStr = formatDate(new Date(startDate));
  const endStr = formatDate(new Date(endDate));

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kanasu Housewarming Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Kanasu_Griha_Pravesh_Invitation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
