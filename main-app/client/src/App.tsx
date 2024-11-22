import { Button } from "@/components/ui/button"

function App() {

  return (
    <div className="w-screen h-svh flex flex-col items-center justify-center gap-y-3">
      <p className="text-3xl font-semibold underline">Benvenuto sul client di PostOnReddit.com</p>
      <Button onClick={() => alert('Benvenuto sul client di PostOnReddit.com')}>Click me</Button>
    </div>
  );
}

export default App
