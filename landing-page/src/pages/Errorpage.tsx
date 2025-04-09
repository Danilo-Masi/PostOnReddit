import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Errorpage() {
  return (
    <div className="w-full h-auto min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
      <p className="text-sm text-gray-500">You might want to check the URL or return to the homepage.</p>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2">
        <Link to={"/"}><ArrowLeft /> Go back to the homepage</Link>
      </Button>
    </div>
  );
}
