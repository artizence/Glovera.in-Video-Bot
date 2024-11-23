import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl"> Counselling.com</a>
      </div>
      <div className="flex-none">
        <Link href={"/student/signup"} className="btn btn-link">Sign up</Link>
        <Link href={"/student/login"} className="btn btn-primary">Login</Link>
      </div>
    </nav>
  );
}
