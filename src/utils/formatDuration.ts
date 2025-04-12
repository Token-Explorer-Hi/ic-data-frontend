/**
 * Format a duration in seconds to a human readable string
 * @param seconds - Duration in seconds
 * @returns Formatted string like "2 years 3 months" or "5 days 2 hours"
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return '0 seconds';

  const timeUnits = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];

  let remainingSeconds = seconds;
  const parts: string[] = [];

  for (const { unit, seconds: unitSeconds } of timeUnits) {
    if (remainingSeconds >= unitSeconds) {
      const count = Math.floor(remainingSeconds / unitSeconds);
      parts.push(`${count} ${unit}${count !== 1 ? 's' : ''}`);
      remainingSeconds %= unitSeconds;

      // Only show at most 2 units
      if (parts.length === 2) break;
    }
  }

  return parts.length > 0 ? parts.join(' ') : '0 seconds';
}
