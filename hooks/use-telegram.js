import { useCallback, useEffect, useState } from "react";

export const useTelegram = () => {
  const [telegram, setTelegram] = useState(null);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      setTelegram(window.Telegram.WebApp);
    }
  }, []);

  const onClose = useCallback(() => {
    telegram.close();
  }, [telegram]);

  return {
    onClose,
    telegram,
  };
};

export const useTelegramInitData = () => {
  const telegram = window.Telegram.WebApp;

  const [data, setData] = useState({});

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(telegram.initData)
    );

    const initData = {};

    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(initData);
  }, []);

  return data;
};
