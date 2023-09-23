import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../../hooks/use-telegram";
import BotAuthForm from "../BotAuthForm";

const BotPage = () => {
  const [password, setPassword] = useState("");
  const { telegram } = useTelegram();

  const submitData = useCallback(() => {
    if (!telegram) return;

    const data = {
      user_id: telegram?.initDataUnsafe?.user?.id,
      password,
      username: telegram?.initDataUnsafe?.user?.username,
    };
    console.log("submitData: ", data);

    const json = JSON.stringify(data);
    console.log("submitJSON: ", json);
    telegram.sendData(json);
  }, [telegram, password]);

  useEffect(() => {
    if (!telegram) return;

    telegram.MainButton.onClick(submitData);

    return () => {
      telegram && telegram.MainButton.offClick(submitData);
    };
  }, [telegram, submitData]);

  useEffect(() => {
    if (!telegram) return;

    if (password) {
      telegram.MainButton.setParams({
        is_active: true,
        color: telegram.themeParams.button_color,
      });
    } else {
      telegram.MainButton.setParams({
        is_active: false,
        color: "#cccccc",
      });
    }
  }, [telegram, password]);

  return (
    <div className="bg-telegram-white h-screen">
      <BotAuthForm
        username={telegram?.initDataUnsafe?.user?.username}
        password={password}
        onSetPassword={setPassword}
      />
    </div>
  );
};

export default BotPage;
