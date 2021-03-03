import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <h1>Welcome to the Everledger platform!</h1>
      <Link href="/upload">
        <a href="/upload">Upload</a>
      </Link>
    </div>
  );
}
