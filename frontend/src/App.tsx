import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user,logout } = useAuth();

  

  return (
    <>
      <div className=" grid h-screen place-items-center">
        <div>
          <p>Hello, Chick Chat {user?.email}</p>
          {user ? (
            <Link to={"/auth"} onClick={()=> logout()}>
              <Button>Logout</Button>
            </Link>
          ) : (
            <>
              <Link to={"/auth"}>
                <Button className=" bg-white text-black hover:text-white border" >
                  Login
                </Button>
              </Link>
              <Link to={"/auth/register"}>
                <Button className=" bg-white text-black hover:text-white border">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
