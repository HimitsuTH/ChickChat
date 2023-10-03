import { useRouteError, Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  // console.error(error);

  return (
    <div id="error-page" className="grid h-screen place-items-center">
      <div className="text-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {(error as { statusText?: string })?.statusText || error.message}
          </i>
        </p>
        <Link to={`/`}>
          <Button className=" mt-5">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
