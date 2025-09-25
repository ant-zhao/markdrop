type Props = React.SVGProps<SVGSVGElement>

export default function SliderButton(props: Props) {
  return (
    <svg
      className="h-12 w-12 transition-transform"
      fill="none"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      stroke="currentColor"
      style={{
        borderImageWidth: 0,
      }}
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="white" stroke="none" />
      <polygon points="22,24 28,18 28,30" fill="#FF5722" transform="translate(-6,0)" stroke="none" />
      <polygon points="22,24 28,18 28,30" fill="#FF5722" transform="translate(6,0) scale(-1,1) translate(-50,0)" stroke="none" />
    </svg>
  );
}