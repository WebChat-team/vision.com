
export function formatDuration(seconds: number) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    return [
      hours > 0 ? hours : null,
      String(minutes).padStart(hours ? 2 : 1, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  }