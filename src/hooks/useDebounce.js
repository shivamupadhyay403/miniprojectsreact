import { useEffect, useState } from "react";
// useDebounce hooks takes three arguement api customTime and a input
const useDebounce = (api, customTime = 600, input) => {
  //useState for setting response which comes from api
  const [response, setResponse] = useState("");
  //async function for calling api
  const callApi = async () => {
    const responseData = await fetch(api);
    const result = await responseData.json();
    return result?.data;
  };

  //useEffect runs where useDebounce hook is called whenever api input and customTime changes
  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (input) {
        const data = await callApi();
        setResponse(data);
      }
    }, customTime);

    return () => clearTimeout(timeOut);
  }, [api, input, customTime]);
  //returning api response
  return { response };
};

export default useDebounce;
