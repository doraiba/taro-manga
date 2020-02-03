import Taro, { useMemo } from '@tarojs/taro';
import { observer } from '@tarojs/mobx';
import { View, Form, Input, Button } from "@tarojs/components";

import useStores from '@/hooks/use-stores';
import useFormal from '@kevinwolf/formal'

const Log: Taro.FC = () => {
  const { counterStore: { counter } } = useStores();

  const initialValues = useMemo(() => ({
    firstName: "",
    lastName: "",
    email: ""
  }), []);
  const formal = useFormal(initialValues, {
    onSubmit: values => console.log("Your values are:", values)
  });

  const handleSubmit = e => {
    e.preventDefault();
    formal.submit();
  };

  return (
    <View>
      <View>當前點擊次數爲: {counter}</View>
      <Form onSubmit={handleSubmit}>
        <Input name='firstName' value={formal.values.firstName} onInput={e => formal.change("firstName", e.detail.value)} ></Input>
        <Button formType='submit'>提交</Button>
      </Form>
    </View>
  )
}
Log.config = {
  navigationBarTitleText: "點擊記錄"
}
export default observer(Log)
