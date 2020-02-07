import {useEffect} from "@tarojs/taro";
import EventCenter, {EventDefine} from "@/utils/event-center";

const useScrollToLowerEvent = (listener: (...args: any[]) => void) => {
  useEffect(() => {
    EventCenter.on(EventDefine.ScrollToLowerEvent, listener)
    return () => EventCenter.off(EventDefine.ScrollToLowerEvent)
    //  eslint-disable-next-line
  }, [])
}
export default useScrollToLowerEvent
