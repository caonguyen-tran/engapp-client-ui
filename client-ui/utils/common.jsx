export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

export const formatTime = (dateString) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleTimeString("vi-VN", options);
};

export const formattedStartTime = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formattedEndTime = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const parseBoundingBox = (boxString) => {
  const [x1, y1, x2, y2] = boxString.split("/").map(Number);
  return { x1, y1, x2, y2 };
};

export const calculateStatsData = (data) => {
  if (!data || data.length === 0) {
    return {
      avgCorrectPercentage: 0,
      avgOverallPoint: 0,
      avgFinishedTime: 0,
    };
  }

  const total = data.reduce(
    (acc, item) => {
      acc.avgCorrectPercentage += item.avgCorrectPercentage;
      acc.avgOverallPoint += item.avgOverallPoint;
      acc.avgFinishedTime += item.avgFinishedTime;
      return acc;
    },
    {
      avgCorrectPercentage: 0,
      avgOverallPoint: 0,
      avgFinishedTime: 0,
    }
  );

  const count = data.length;

  return {
    avgCorrectPercentage: total.avgCorrectPercentage / count,
    avgOverallPoint: total.avgOverallPoint / count,
    avgFinishedTime: total.avgFinishedTime / count,
  };
};
