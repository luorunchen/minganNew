
let userName = sessionStorage.getItem('userName')
let powerId = window.sessionStorage.getItem('new_role')
let rid = window.sessionStorage.getItem('power')
// console.log()
class PublicMethods {
  constructor() {
    this.userName = userName
    this.powerId = powerId
    this.rid = rid
    // this.name = '公用变量'
  }
  // verificationPhon(phone) {
  //   // 大陆手机号码11位数，匹配格式：前三位固定格式+后8位任意数
  //   // 13+任意数 * 15+除4的任意数 * 18+除1和4的任意数 * 17+除9的任意数 * 147
  //   //  新增了166、198、199号段的手机号
  //   var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  //   return reg.test(phone);
  // }
}


var Plugins = new PublicMethods();

export default Plugins;