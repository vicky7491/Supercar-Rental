import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
      <h2 className="text-6xl font-bold text-red-500">404</h2>
      <h4 className="text-2xl mt-4">Sorry! Page Not Found</h4>
      <p className="text-xl mt-2">Oops! It seems like The page you're looking for doesn't exist.It you believe there's an issue, feel free to report it, and we'll look into it.</p>
      <Link 
        to="/" 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
