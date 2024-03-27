export function formatDate(date) {
  date = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${date.getDate()} ${months[date.getMonth() - 1]
    }, ${date.getFullYear()}`;
  
  return formattedDate;
};