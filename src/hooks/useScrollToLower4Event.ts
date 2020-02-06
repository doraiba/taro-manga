import {useEffect} from "@tarojs/taro";
import EventCenter, {EventDefine} from "@/utils/event-center";

const useScrollToLower4Event = (listener: (...args: any[]) => void) => {
  useEffect(() => {
    EventCenter.on(EventDefine.ScrollToLowerEvent, listener)
    return () => EventCenter.off(EventDefine.ScrollToLowerEvent)
    //  eslint-disable-next-line
  }, [])
}
export default useScrollToLower4Event
