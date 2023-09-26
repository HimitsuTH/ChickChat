import { useRouteError, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

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
        <Button className=" mt-5">
          <Link to={`/`}>Back</Link>
        </Button>
      </div>
    </div>
  );
}
