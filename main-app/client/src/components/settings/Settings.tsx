// Components
import ThemeSettings from "./ThemeSettings";
import ProfileSettings from "./ProfileSettings";
import ChangelogSettings from "./ChangelogSettings";

export default function Settings() {
  return (
    <div className="w-full h-fit md:h-full flex md:flex-row flex-col gap-6 mb-20 md:mb-0">
      <ProfileSettings />
      <ThemeSettings />
      <ChangelogSettings />
    </div >
  );
}
