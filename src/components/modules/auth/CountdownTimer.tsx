type CountdownTimerProps = {
  countdown: number;
  onResend: (e: React.FormEvent) => Promise<void>;
};

export function CountdownTimer({ countdown, onResend }: CountdownTimerProps) {
  return (
    <div className='flex justify-between mt-1'>
      <p className='text-sm text-black font-bold'>
        {countdown > 0
          ? `${Math.floor(countdown / 60)}:${(countdown % 60)
              .toString()
              .padStart(2, '0')}`
          : '시간 만료'}
      </p>
      {countdown === 0 && (
        <button
          onClick={onResend}
          type='button'
          className='text-sm text-blue-500 hover:underline'
        >
          인증번호 재발송
        </button>
      )}
    </div>
  );
}
