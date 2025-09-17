
type Props = React.SVGProps<SVGSVGElement> & {
  isOpen: boolean;
}

export default function ArrowBottom({ isOpen, ...props }: Props) {
  return (
    <svg
      className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}