import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl"> Counselling.com</a>
      </div>
      <div className="flex-none">
        <Link href={"/detail/personal"} className="btn btn-primary">Get Started</Link>
      </div>
    </nav>
  );
}
