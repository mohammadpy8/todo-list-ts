import { Bounce, toast } from "react-toastify";

type TPositionToast =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-center"
  | "top-center";

function useToastNotification(closeTime?: number, position?: TPositionToast) {
  return {
    errorToast: (textMsg: string) =>
      toast.error(textMsg, {
        position: position ?? "top-center",
        autoClose: closeTime ?? 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      }),
    successToast: (textMsg: string) =>
      toast.success(textMsg, {
        position: position ?? "top-center",
        autoClose: closeTime ?? 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      })
  };
}

export default useToastNotification;
