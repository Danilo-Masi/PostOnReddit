import logo from "@/assets/icon.png";
import { memo } from "react";

const Logo = memo(() => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-10 h-10">
        <img src={logo} alt="postonreddit logo" className="object-cover" />
      </div>
      <h1
        aria-label="postonreddit logo"
        className='text-lg font-bold text-zinc-800 dark:text-zinc-50'>
        postonreddit
      </h1>
    </div>
  );
});

export default Logo;
