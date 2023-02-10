/*import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-2">
        <h1 className="">
          restorePhotos.io
        </h1>
      </Link>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-10 sm:h-[34px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a>
    </header>
  );
}
*/

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-full top-0 bg-white border-b-2 py-3 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex space-x-2">
          <h1 className="">
            restorePhotos.io
          </h1>
        </Link>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Vercel Icon"
            src="/vercelLogo.png"
            className="w-8 h-8"
            width={32}
            height={28}
          />
        </a>
      </div>
    </header>
  );
}

