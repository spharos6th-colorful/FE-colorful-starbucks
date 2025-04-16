export type SignUpRequestData = {
  memberName: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickName: string;
  memberBirth: string;
  memberLevel: string;
  gender: 'M' | 'W';
};

export type SignUpFormState = {
  email: string;
  password: string;
  passwordConfirm: string;
  memberName: string;
  phoneNumber: string;
  nickName: string;
  memberBirth: string;
  gender: 'M' | 'W';
};

export type FormErrors = {
  [K in keyof SignUpFormState]?: string;
};
