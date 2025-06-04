
export function pluralize(number: number, one: string, two: string, five: string) {
  number = Math.abs(number) % 100;
  const remainder = number % 10;
  
  if (number > 10 && number < 20) return five;
  if (remainder > 1 && remainder < 5) return two;
  if (remainder === 1) return one;
  
  return five;
}

export function formatUploadDate(timestamp: string) {
  const now = new Date();
  const uploadDate = new Date(timestamp);

  // @ts-ignore
  const diffSeconds = Math.floor((now - uploadDate) / 1000);

  // Логика для разных интервалов времени
  if (diffSeconds < 60) return 'Только что';
  
  if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} ${pluralize(minutes, 'минуту', 'минуты', 'минут')} назад`;
  }
  
  if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')} назад`;
  }
  
  if (diffSeconds < 2592000) {
    const days = Math.floor(diffSeconds / 86400);
    return `${days} ${pluralize(days, 'день', 'дня', 'дней')} назад`;
  }
  
  if (diffSeconds < 31536000) {
    const months = Math.floor(diffSeconds / 2592000);
    return `${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')} назад`;
  }

  return uploadDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

}
