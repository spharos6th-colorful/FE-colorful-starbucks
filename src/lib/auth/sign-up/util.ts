export const getTermsTag = (required: boolean) => {
  const tag = required ? '[필수]' : '[선택]';
  return `${tag} `;
};

export function formatTime(seconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(seconds));

  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
