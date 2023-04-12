import AuthService from "../services/AuthService";

export function requestOptions(){
  const { apiUrl } = useRuntimeConfig().public;
  const current = currentClient().value;
  const headers: HeadersInit = current
    ? { "Authorization": `Bearer ${current.token}` }
    : { "Accept":"application/json" };
  return {
    baseURL: apiUrl,
    headers,
    onResponseError(context:any) {
      console.log(context);
      if(context.response.status == 401 || context.response.status == 403){
        AuthService.logout();
      }
    },
  };
};
