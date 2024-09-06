import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <>
      <RouteAnimation>
        <div className="flex flex-col justify-start items-center pt-[64px] font-redhat">
          <h1 className="font-extrabold text-8xl">404</h1>
          <h4 className="mt-4 text-4xl font-medium">Page not found</h4>
          <div className="mt-8 flex flex-row justify-around items-end">
            <Button
              variant="link"
              size="lg"
              onClick={() => {
                nav("/");
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Go Home</span>
            </Button>
            <Button
              variant="link"
              size="lg"
              onClick={() => {
                nav(-1);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
        </div>
      </RouteAnimation>
    </>
  );
}
