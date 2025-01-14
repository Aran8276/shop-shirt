import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ApplicationLogo from "@/components/AppLogo";
import { useRouter } from "next/navigation";

interface SelfProps {
  currentNav: string;
  navLinkArray: navLinkArray[];
}

type navLinkArray = {
  navTitle: string;
  href: string;
};

type UserResponseData = {
  isUserLoggedIn?: boolean;
  userEmail?: string;
};

function Header(props: SelfProps) {
  const [userData, setUserData] = useState<UserResponseData | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/getuser", {
        method: "POST",
      });
      const resData = await res.json();
      res.status == 200 ? setUserData(resData) : setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandler = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const status = res.status;
      if (status === 200 && status) {
        router.push("/login");
        setUserData(null);
      } else if (status === 400 && status) {
        alert("Failed to log out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="flex justify-between sticky top-0 z-10 bg-white">
      {/* <div className="flex flex-col">
        <h1>Your Name Is: {props.isUserLoggedin ? props.userName : "False"}</h1>
        <h1>
          Are you an admin?:{" "}
          {props.isUserLoggedin
            ? props.userName
              ? "True"
              : "False But Logged In"
            : "False"}
        </h1>
      </div>{" "} */}
      {/* */
      /* This is a debugger */}
      <div className="flex space-x-6 justify-items-center">
        <Link href="/">
          <ApplicationLogo className="w-[128px] h-[64px] scale-[0.70]" />
        </Link>
        <nav className="flex justify-start space-x-8 self-center text-center">
          {props.navLinkArray.map((link) => {
            return (
              <Link href={link.href} key={link.navTitle}>
                <span
                  className={
                    props.currentNav === link.href
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }
                >
                  {link.navTitle}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex self-center mr-12 space-x-8">
        {userData ? (
          <div className="self-center flex space-x-4">
            <span>{userData.userEmail}</span>
            <button onClick={logOutHandler}>Logout</button>
          </div>
        ) : (
          <div className="self-center">
            <Link href="/login">
              <span className="">Login</span>
            </Link>
          </div>
        )}

        <div className="self-center">
          <Link href="/shop/cart">
            <FontAwesomeIcon icon={faBagShopping} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
