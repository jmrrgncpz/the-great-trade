import { useEffect } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardBehavior(
  onKeyboardDidShow,
  onKeyboardDidHide
) {
  return useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const hideListener = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
}
