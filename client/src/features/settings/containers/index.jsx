import ProfileEdit from "../components/ProfileEdit";
import PushNotification from "../components/PushNotification";
import PasswordChange from "../components/PasswordChange";
import ScoresDelete from "../components/ScoresDelete";
import AccountDelete from "../components/AccountDelete";

export default function Settings() {
  return (
    <main>
      <ProfileEdit />
      <PushNotification />
      <PasswordChange />
      <ScoresDelete />
      <AccountDelete />
    </main>
  );
}
