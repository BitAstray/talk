/*
 * @Author: Astray
 * @Date: 2023-05-10 12:45:15
 * @LastEditors: Astray bitcreate@qq.com
 * @LastEditTime: 2023-05-10 14:53:54
 * @FilePath: \Code\11. 网络\聊天机器人\js\user.js
 */

// 用户登录和注册表单项通用代码

/**
 * @description: 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
  /**
   * @description: 构造器
   * @param {String} txtID 文本框ID
   * @param {Function} validatorFunc 验证规则，当需要验证时会调用该函数，函数的参数为当前文本框的值，函数的返回值未验证的错误消息，没返回则验证通过
   */
  constructor(txtID, validatorFunc) {
    this.input = $("#" + txtID);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    // 失去焦点
    this.input.onblur = () => {
      this.valdate();
    };
  }

  /**
   * @description: 验证 成功true, 失败false
   * @return {boolean}
   */
  async valdate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  /**
   * @description: 对传入所有验证器进行统一的验证，全通过返回true,否则false
   * @param {FieldValidator[]} valdators
   * @return {boolean}
   */
  static async valdate(...valdators) {
    const proms = valdators.map((v) => v.valdate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
