import { useCallback, useEffect, useState } from "react";
// useDebounceWithOptimisations hooks takes three arguement api customTime and a input
const useDebounceWithOptimisations = (api, customTime = 600, input) => {
  //useState for setting response which comes from api
  const [response, setResponse] = useState("");
  //async function for calling api this will be called only when api is being changed 
  const callApi = useCallback(
    async (signal) => {
      const responseData = await fetch(api,{signal});
      const result = await responseData.json();
      return result?.data;
    },
    [api],
  );
  //useEffect runs where useDebounceWithOptimisations hook is called whenever api input and customTime changes
  useEffect(() => {
    //creating a new abortcontroller using new and passing its signal to callApi function
    const controller = new AbortController();
    const timeOut = setTimeout(async () => {
      if (input) {
        const data = await callApi(controller.signal);
        setResponse(data);
      }
    }, customTime);

    return () => {
        //cleaning up
      clearTimeout(timeOut);
      controller.abort();
    };
  }, [api, input, customTime]);
  //returning api response
  return { response };
};

export default useDebounceWithOptimisations;
