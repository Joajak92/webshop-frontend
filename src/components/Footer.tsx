type FooterProps = {
  onOpenCookieInfo: () => void;
};

const Footer = ({ onOpenCookieInfo }: FooterProps) => {
  return (
    <footer className="mt-auto flex flex-col gap-2 bg-slate-600 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onOpenCookieInfo}
        className="text-left underline underline-offset-4 hover:text-slate-200"
      >
        Information om nödvändiga cookies
      </button>

      <p>Copyright</p>
    </footer>
  );
};

export default Footer;
