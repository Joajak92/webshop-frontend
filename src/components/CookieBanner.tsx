type CookieBannerProps = {
  isVisible: boolean;
  onClose: () => void;
};

const CookieBanner = ({ isVisible, onClose }: CookieBannerProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Information om inloggningscookie"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border border-slate-300 bg-white p-4 text-left text-slate-800 shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Information om inloggning</h2>
          <p className="mt-1 text-sm leading-relaxed">
            Vi använder en nödvändig HttpOnly-cookie för att hantera din
            inloggning och ge säker åtkomst till tjänsten.
          </p>
        </div>

        <button
          type="button"
          aria-label="Stäng informationen om inloggningscookie"
          onClick={onClose}
          className="shrink-0 rounded px-2 py-1 text-xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;