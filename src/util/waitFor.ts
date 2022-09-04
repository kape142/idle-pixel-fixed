export const waitFor = (check: () => boolean, func: () => void) => {
  const wrapperFunc = () => {
    if(check()){
      func()
    }else{
      setTimeout(wrapperFunc, 1000)
    }
  }
  wrapperFunc()
}