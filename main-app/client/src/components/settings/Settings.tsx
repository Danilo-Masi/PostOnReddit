// Shadncui
import { KeySquare } from "lucide-react";
import { Button } from "../ui/button";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function Settings() {

  const handleLoginReddit = () => {
    window.location.href = `${SERVER_URL}/api/reddit-redirect`;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button
        type="button"
        className="bg-buttonColor hover:bg-buttonHoverColor"
        onClick={() => handleLoginReddit()}>
        <KeySquare />
        Access to Reddit
      </Button>
    </div>
  );
}
