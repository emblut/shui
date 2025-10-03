export function getSwedishTime() {
  return new Date().toLocaleString('sv-SE', {
    timeZone: 'Europe/Stockholm',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
