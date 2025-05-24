
export function formatUploadDate(timestamp: string) {
  const now = new Date();
  const uploadDate = new Date(timestamp);

  // @ts-ignore
  const diffSeconds = Math.floor((now - uploadDate) / 1000);

  // Логика для разных интервалов времени
  if (diffSeconds < 60) return 'Только что';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} минут назад`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} часов назад`;
  if (diffSeconds < 2592000) return `${Math.floor(diffSeconds / 86400)} дней назад`;
  if (diffSeconds < 31536000) return `${Math.floor(diffSeconds / 2592000)} месяцев назад`;

  return uploadDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

}
