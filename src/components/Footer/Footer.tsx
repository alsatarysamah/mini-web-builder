import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} WebBuilder. All rights reserved.
        </div>

        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5 hover:text-blue-500 transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5 hover:text-sky-400 transition" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 hover:text-gray-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
