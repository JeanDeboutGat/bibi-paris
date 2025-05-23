import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-light mb-6">404</h1>
        <h2 className="text-2xl font-light mb-8">Page Not Found</h2>
        <p className="text-gray-700 mb-12">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
        >
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
}
