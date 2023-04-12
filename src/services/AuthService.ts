import RequestResponse from "../models/RequestResponse";
import StorageService from "./StorageService";

export default class AuthService {
  static async login(email: String, password: String) {
    try {
      const { data: response } = await useFetch("/clients/login", {
        ...requestOptions(),
        method: "POST",
        body: { email, password },
      });
      currentClient().value = (response.value as RequestResponse).data;
      StorageService.saveClient(currentClient().value!);
      navigateTo("/home");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async logout() {
    currentClient().value = null;
    StorageService.clear();
    navigateTo("/login");
  }
}