import "@styles/settings/settings.css";
import ProfileEdit from "@components/settings/profileEdit";
import PushNotification from "@components/settings/pushNotification";
import PasswordChange from "@components/settings/passwordChange";
import ScoresDelete from "@components/settings/scoresDelete";
import AccountDelete from "@components/settings/accountDelete";

const SettingsPage = () => {
  return (
    <main className="Settings">
      <ProfileEdit />
      <PushNotification />
      <PasswordChange />
      <ScoresDelete />
      <AccountDelete />
    </main>
  );
};

export default SettingsPage;
