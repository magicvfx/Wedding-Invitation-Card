import { CoupleInfo } from '../types/wedding';

export function createGoogleCalendarUrl(couple: CoupleInfo): string {
  const startDate = new Date(couple.weddingDate);
  // Default wedding duration 7 hours
  const endDate = new Date(startDate.getTime() + 7 * 60 * 60 * 1000);

  const formatGoogleDate = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const text = encodeURIComponent(`The Wedding of ${couple.brideName} & ${couple.groomName}`);
  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;
  const details = encodeURIComponent(
    `Join us as we celebrate the marriage of ${couple.brideName} and ${couple.groomName}.\n\nDress Code: ${couple.dressCode}\nReception to follow at ${couple.receptionVenue}.\n\n${couple.hashtag}`
  );
  const location = encodeURIComponent(`${couple.ceremonyVenue}, ${couple.ceremonyAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(couple: CoupleInfo) {
  const startDate = new Date(couple.weddingDate);
  const endDate = new Date(startDate.getTime() + 7 * 60 * 60 * 1000);

  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Digital Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${startDate.getTime()}@weddinginvitation.app`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:The Wedding of ${couple.brideName} & ${couple.groomName}`,
    `DESCRIPTION:Celebrate the union of ${couple.brideName} & ${couple.groomName}. Reception at ${couple.receptionVenue}. Dress code: ${couple.dressCode}.`,
    `LOCATION:${couple.ceremonyVenue}, ${couple.ceremonyAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${couple.groomName}_and_${couple.brideName}_Wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
