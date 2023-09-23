import React, { useEffect } from "react";
import Script from "next/script";
import BotPage from "../components/bot/Page";
import { useTelegram } from "../hooks/use-telegram";

const Bot = () => {
  const { telegram } = useTelegram();

  useEffect(() => {
    if (!telegram) return;

    telegram.ready();
    telegram.MainButton.show();
    telegram.MainButton.setParams({
      text: "Submit",
      color: "#818181",
    });
    telegram.MainButton.disable();
  }, [telegram]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <BotPage />
    </>
  );
};
Bot.propTypes = {};
Bot.defaultProps = {};
Bot.getInitialProps = async () => {
  const isProtected = false;
  return { isProtected };
};
export default Bot;
