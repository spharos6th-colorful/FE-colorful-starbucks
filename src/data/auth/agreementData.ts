export interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
}

export const agreementItems: AgreementItem[] = [
  {
    id: 'terms',
    label: '[필수] 이용약관 동의',
    required: true,
  },
  {
    id: 'privacy',
    label: '[필수] 개인정보 수집 및 이용 동의',
    required: true,
  },
  {
    id: 'card',
    label: '[필수] 스타벅스 카드 이용약관',
    required: true,
  },
];
