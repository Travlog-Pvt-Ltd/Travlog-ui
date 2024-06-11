export function formatDate(date) {
  date = new Date(date);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = `${date.getDate()} ${
    months[date.getMonth() - 1]
  }, ${date.getFullYear()}`;

  return formattedDate;
}

export const timeSinceUpdated = (date) => {
  const uDate = new Date(date);
  const nDate = new Date();
  const timeSince = nDate - uDate;
  const seconds = Math.floor(timeSince / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  return `${years}y`;
};
