const STORAGE_KEY = 'lb_translations_today';
const DATE_KEY = 'lb_translations_date';
const DAILY_LIMIT = 50;

function resetIfNewDay() {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem(DATE_KEY);
  if (storedDate !== today) {
    localStorage.setItem(STORAGE_KEY, '0');
    localStorage.setItem(DATE_KEY, today);
  }
}

export function isRateLimited(): boolean {
  resetIfNewDay();
  const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  return count >= DAILY_LIMIT;
}

export function incrementUsage(): void {
  resetIfNewDay();
  const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  localStorage.setItem(STORAGE_KEY, String(current + 1));
}

export function getRemainingCount(): number {
  resetIfNewDay();
  const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  return Math.max(0, DAILY_LIMIT - current);
}
