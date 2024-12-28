import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to PM Interview Prep</h1>
      <p className="text-gray-600 mb-4">
        Select a category from the sidebar to start practicing interview questions.
      </p>
      
      <div className="grid gap-4 mt-8">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Getting Started</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Choose a question category from the sidebar</li>
            <li>Track your progress with checkboxes</li>
            <li>Your progress is automatically saved</li>
            <li>Practice regularly for better preparation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
