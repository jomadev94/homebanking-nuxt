import StorageService from "../services/StorageService";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const current = StorageService.getCurrentClient();
  if (to.name != "login" && to.name != "register" && !current)
    return navigateTo("/login");
  if (to.name == "login" && current) return navigateTo("home");
});
