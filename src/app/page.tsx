import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <Link href="/chat/home">Go to Chat Home</Link>
    </div>
  );
}
