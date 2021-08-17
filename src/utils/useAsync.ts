import { useState } from 'react';

// 这里的TS 类型定义用得好啊
interface State<D> {
  error: Error | null;
  data: D | null;
  // 这里的字符串类型定义极好的防止了自己手写失误导致代码报错
  status: 'idle' | 'loading' | 'error' | 'success';  // idle 表示异步操作未发生
}

const defaultInitialState: State<null> = {
  data: null,
  error: null,
  status: 'idle',
}

const defaultConfig = {
  throwOnError: false
}

// 该自定义钩子用于统一处理Loading 和 Error状态
export const useAsync = <D>(initialState?: State<D>, initialConfig?:typeof defaultConfig) => {
  const config = {...defaultConfig, initialConfig}
  // 为什么不直接在参数这里写默认值呢
  // 这里其实就解释了<>里面又有<>的原因
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const [retry, setRetry] = useState(() => () => {

  })

  /* 下面的这些写法是真的牛逼 */
  const setData = (data: D) => setState({
    data,
    status: 'success',
    error: null,
  })

  const setError = (error: Error) => setState({
    data: null,
    status: 'error',
    error
  })

  // run函数用来触发异步请求
  // 这个run 函数有点意思 疑惑：不是参数就已经限定了传入的必须是promise吗？
  const run = (promise: Promise<D>, runConfig?:{retry: () => Promise<D>}) => {
    // 如果传入的不是promise 或 什么也不传的情况
    // !promise 表示什么也没传入
    // !promise.then 表示不是promise
    if (!promise || !promise.then) {
      // throw Error 会打断一切的进程，所以后面的内容就不会再继续执行
      throw new Error('请传入Promise类型数据');  
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })

    setState({...state, status: 'loading'})
    return promise
    .then(data => {
      setData(data);
      return data;
    }).catch(error => {

      console.log('....', error);
      
      // 这里的内容非常有意思！！！
      // catch 会消化异常(??)，如果不主动抛出，外面是接受不到异常的
      setError(error); 
      // return error;    // 这里的消化异常指的是 即使在catch里，只要代码没报错，会被下一个then接收而非catch接收(双越)
      // 主动抛出异常的方法
      if (config.throwOnError) return Promise.reject(error);
      return Promise.reject(error);
    })
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    // retry被调用时重新跑一边run，让state刷新一遍
    retry,
    ...state      // 这里的state 是解构语法，即完整的把state里的内容返回
  }
}


