export function isPlaceOpen(openingHours) {
  const now = new Date();
  const currentDay = now.getDay(); // 0是週日，1-6是週一到週六

  // 轉換時間格式為分鐘數，方便比較
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // 中文星期對應
  const dayMap = {
    0: "星期日",
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "星期六",
  };

  // 找到當天的營業時間
  const todaySchedule = openingHours.find((schedule) =>
    schedule.startsWith(dayMap[currentDay])
  );

  if (todaySchedule.includes("休息")) {
    return false;
  }

  if (todaySchedule.includes("24 小時營業")) {
    return true;
  }

  // 解析營業時間區間
  const timeRanges = todaySchedule
    .split(": ")[1]
    .split(", ")
    .map((range) => {
      const [start, end] = range.split(" – ");
      const [startHours, startMinutes] = start.split(":").map(Number);
      const [endHours, endMinutes] = end.split(":").map(Number);
      return {
        start: startHours * 60 + startMinutes,
        end: endHours * 60 + endMinutes,
      };
    });

  // 檢查當前時間是否在任何營業時段內
  return timeRanges.some(
    (range) => currentMinutes >= range.start && currentMinutes <= range.end
  );
}
