import Link from "next/link";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaMobile,
  FaLaptop,
  FaMobileAlt,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="/"
          >
            darq
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-3xl lg:text-4xl">
          <Link
            className="hidden sm:block text-white/90 hover:text-white"
            href="https://sahils.in"
          >
            <FaLaptop />
          </Link>
          <Link
            className=" sm:hidden text-white/90 hover:text-white"
            href="https://sahils.in"
          >
            <FaMobileAlt />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://github.com/sahilsz"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://linkedin.com"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://twitter.com/"
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
    </nav>
  );
}
