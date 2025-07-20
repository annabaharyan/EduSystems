import {useEffect} from "react";
import EducationalDegreesWrapper from "./components/EducationalDegreesWrapper";
import {notification} from "antd";
import {setNotificationApi} from "./helpers/notificationService";
const App=()=> {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    setNotificationApi(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      <EducationalDegreesWrapper/>
    </>
  )
}

export default App
