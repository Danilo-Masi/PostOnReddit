// Components
import ThemeSettings from "./ThemeSettings";
import ProfileSettings from "./ProfileSettings";
import ChangelogSettings from "./ChangelogSettings";

export default function Settings() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-10 mt-3 px-3 overflow-scroll">
      <ProfileSettings />
      <ThemeSettings />
      <ChangelogSettings />
    </div >
  );
}
