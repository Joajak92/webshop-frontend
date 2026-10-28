import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="items-center p-5">
      <h1 className="text-lg font-bold text-center uppercase">Error</h1>
      <p className="mt-3 bg-red-200 p-3">
        Ett fel inträffade: <br />
        <b>Sidan du försökte nå kunde inte hittas eller finns inte.</b>
      </p>
      <div className="mt-3">
        <Link
          to="/"
          className="text-black underline hover:no-underline hover:text-slate-600 uppercase"
        >
          Tryck på den här länken för att komma till startsidan.
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
