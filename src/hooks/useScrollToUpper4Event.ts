import {useEffect} from "@tarojs/taro";
import EventCenter, {EventDefine} from "@/utils/event-center";

const useScrollToUpper4Event = (listener: (...args: any[]) => void) => {
  useEffect(() => {
    EventCenter.on(EventDefine.ScrollToUpperEvent, listener)
    return () => EventCenter.off(EventDefine.ScrollToUpperEvent)
    //  eslint-disable-next-line
  }, [])
}
export default useScrollToUpper4Event
