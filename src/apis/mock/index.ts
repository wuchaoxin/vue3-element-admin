import { handleMock } from "@/utils/mock";
import { login, getInfo } from "@/apis/user";

handleMock(login, "123456");
handleMock(getInfo, {
  roles: ["admin"],
  introduction: "I am a super administrator",
  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  name: "Super Admin",
});
