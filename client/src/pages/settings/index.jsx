import "@styles/settings/settings.css";
import ProfileEdit from "@components/settings/profileEdit";
import PushNotification from "@components/settings/pushNotification";
import PasswordChange from "@components/settings/passwordChange";
import DataDelete from "@components/settings/dataDelete";
import AccountDelete from "@components/settings/accountDelete";

const SettingsPage = () => {
  return (
    <main className="Settings">
      <ProfileEdit />
      <PushNotification />
      <PasswordChange />
      <DataDelete />
      <AccountDelete />
    </main>
  );
};

export default SettingsPage;
