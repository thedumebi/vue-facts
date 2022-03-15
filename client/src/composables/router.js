import router from "../router";

export const goBack = () => router.back();

export const goTo = (link) => router.push(link);
