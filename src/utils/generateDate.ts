export function formatDateToDdMmYyyy(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
