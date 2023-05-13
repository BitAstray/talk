/*
 * @Author: Astray
 * @Date: 2023-05-10 12:46:24
 * @LastEditors: Astray bitcreate@qq.com
 * @LastEditTime: 2023-05-10 15:07:45
 * @FilePath: \Code\11. 网络\聊天机器人\js\login.js
 */
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "请填写密码";
  }
});

const form = $(".user-form");

form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.valdate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return; //验证未通过
  }
  const formData = new FormData(this);
  const userInfo = Object.fromEntries(formData.entries());
  console.log(userInfo);
  const resp = await API.login(userInfo);
  if (resp.code === 0) {
    alert("登录成功, 点击跳转到首页");
    location.href = "./index.html";
  } else {
    alert(resp.msg);
    loginPwdValidator.input.value = "";
  }
};
