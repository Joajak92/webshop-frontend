import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="items-center p-5">
      <h1 className="text-lg font-bold text-center uppercase">Error</h1>
      <p className="mt-3 bg-red-200 p-3">
        An error occurred: <br />
        <b>The page you tried to find does not exist.</b>
      </p>
      <div className="mt-3">
        <Link
          to="/"
          className="text-black underline hover:no-underline hover:text-slate-600 uppercase"
        >
          Click this link to return to home page
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
