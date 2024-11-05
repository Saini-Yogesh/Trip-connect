// Helper function to format the date as "X days ago"
const formatRelativeTime = (date) => {
  const secondsAgo = Math.floor((new Date() - new Date(date)) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (daysAgo > 0) return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  if (hoursAgo > 0) return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  if (minutesAgo > 0)
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
};

export default formatRelativeTime;
