import FakeNewsIdentifier from "../../fake-news-identifier.tsx";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <FakeNewsIdentifier />
    </div>
  );
}
