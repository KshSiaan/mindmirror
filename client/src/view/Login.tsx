import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import checkUser from "@/extra/checkUser";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passErr, setPassErr] = useState<string>("");
  const [cookie, setCookie] = useCookies();

  const nav = useNavigate();

  useEffect(() => {
    if (Object.keys(cookie).length > 0) {
      nav("/");
      console.log(cookie);
      checkUser(cookie.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // console.log(email);
    // console.log(pass);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        pass: pass,
      }),
    });

    if (!response.ok) {
      console.error("fetch operation failed");
      const data = await response.json();
      setPassErr(data.pass);

      return false;
    }

    const data = await response.json();

    console.log(data._id);

    setCookie("token", data._id, {
      maxAge: 604800, // 7 days in seconds
    });

    nav("/");
  }

  return (
    <>
      <RouteAnimation>
        <Navbar />
        <div className="h-dvh w-dvw flex flex-col justify-center items-center ">
          <form
            className="w-4/5 md:w-2/5 h-1/2 py-4 border rounded-md flex flex-col justify-around items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl md:text-3xl font-bold">
              Log in to MindMirror
            </h2>
            <Input
              type="text"
              className="w-4/5 md:w-2/3"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="w-4/5 md:w-2/3">
              <Input
                type="password"
                className="w-full"
                name="pass"
                id="pass"
                placeholder="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <p className="pl-2 pt-2 text-sm font-semibold text-red-600 text-right">
                {passErr}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-evenly items-center w-1/2 gap-y-3">
              <Button variant="default" type="submit">
                Log in
              </Button>
              <Button variant="link">
                <Link to="/register">Create an account</Link>
              </Button>
            </div>
          </form>
        </div>
      </RouteAnimation>
    </>
  );
}
