/*
 * @Author: Astray
 * @Date: 2023-05-09 16:01:37
 * @LastEditors: Astray bitcreate@qq.com
 * @LastEditTime: 2023-05-10 21:40:51
 * @FilePath: \Code\11. 网络\聊天机器人\js\api.js
 */

var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = "Bearer " + token;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, body) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = "Bearer " + token;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * @description: 注册请求
   * @param {*} userInfo 注册信息
   * @return {Promise}
   */
  async function reg(userInfo) {
    return await post("/api/user/reg", userInfo).then((resp) => resp.json());
  }

  /**
   * @description: 登录请求
   * @param {*} loginInfo 登录信息
   * @return {Promise}
   */
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    //登录成功 将响应头中的token保存起来
    if (result.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  /**
   * @description: 验证账号
   * @param {*} loginId 账号
   * @return {Promise}
   */
  async function exists(loginId) {
    return await get("/api/user/exists?loginId=" + loginId).then((resp) =>
      resp.json()
    );
  }

  /**
   * @description: 获取当前登录用户信息
   * @return {Promise}
   */
  async function profile() {
    return await get("/api/user/profile").then((resp) => resp.json());
  }
  /**
   * @description: 发送聊天消息
   * @param {*} content
   * @return {Promise}
   */
  async function sendChat(content) {
    return await post("/api/chat", { content }).then((resp) => resp.json());
  }
  /**
   * @description: 获取聊天记录
   * @return {Promise}
   */
  async function getHistory() {
    return await get("/api/chat/history").then((resp) => resp.json());
  }

  /**
   * @description: 退出登录
   */
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
