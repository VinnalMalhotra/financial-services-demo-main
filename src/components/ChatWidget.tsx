import { useEffect, useState } from "react";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import { chatConfig } from "./search/config";
import "@yext/chat-ui-react/bundle.css";

const ChatWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (
    !isClient ||
    !import.meta.env.YEXT_PUBLIC_CHAT_APIKEY ||
    !import.meta.env.YEXT_PUBLIC_CHAT_BOTID
  ) {
    return null;
  }

  return (
    <ChatHeadlessProvider config={chatConfig}>
      <ChatPopUp
        title="Support"
        showFeedbackButtons={true}
        showTimestamp={true}
        stream={false}
        customCssClasses={{
          buttonIcon: "text-skin-base",
          button: "!bg-none !bg-skin-base",
          panelCssClasses: {
            messageBubbleCssClasses: {
              bubble__user: "!bg-none !bg-skin-banner ",
              bubble__bot: "!bg-none !bg-skin-base/70",
              text__user: "!text-skin-base",
              text__bot: "!text-skin-banner",
            },
            container: "!bg-none bg-skin-accent",
            inputCssClasses: {
              sendButton: "!bg-none disabled:!bg-skin-base/20 !bg-skin-base",
              textArea:
                "!text-skin-base focus-visible:outline focus-visible:outline-skin-base",
            },
          },
          headerCssClasses: {
            container: "!bg-none !bg-skin-base",
            title: "overflow-hidden !text-skin-banner",
          },
        }}
      />
    </ChatHeadlessProvider>
  );
};

export default ChatWidget;
