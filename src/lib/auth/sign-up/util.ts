export const getTermsTag = (required: boolean) => {
  const tag = required ? '[필수]' : '[선택]';
  return `${tag} `;
};
