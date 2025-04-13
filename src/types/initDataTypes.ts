export type PageSubHeaderDataType = {
  id: number;
  path: string;
  title: string;
};

export type NavDataType = {
  id: number;
  text: string;
  path: string;
  icon: React.FC<React.SVGAttributes<SVGSVGElement>>;
};
