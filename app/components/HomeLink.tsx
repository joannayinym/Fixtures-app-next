import Link from "next/link";
import Image from "next/image";

export default function HomeLink({
  showSearch = false,
}: {
  showSearch: boolean;
}) {
  return (
    <div className="flex flex-row justify-start items-center pb-6 text-black font-bold">
      <Link href={"/"}>
        <div className="flex flex-row justify-center items-center">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <p className="text-xl underline text-black hover:text-blue-800 ml-2 mr-6">
            Home
          </p>
        </div>
      </Link>
      {showSearch && (
        <Link
          href={"/search"}
          className="text-xl underline text-black hover:text-blue-800"
        >
          Back to Search
        </Link>
      )}
    </div>
  );
}
