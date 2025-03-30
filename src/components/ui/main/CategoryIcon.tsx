interface CategoryIconProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function CategoryIcon({ title, icon: Icon }: CategoryIconProps) {
  return (
    <li key={title} className='text-center space-y-2'>
      <Icon className='mx-auto' />
      <p>{title}</p>
    </li>
  );
}
