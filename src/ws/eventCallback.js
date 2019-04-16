import userResolves from '../request/user'
import shopProductManageResolves from '../request/shopProductManage'
import productOrderManage from '../request/productOrderManage'
import clientManage from '../request/clientManage'

export default {
  // userResolves
  cb2001: (res) => {
    userResolves.list.resolve2001(res);
  },
  cb2030: (res) => {
    userResolves.list.resolve2030(res);
  },
  cb2021: (res) => {
    userResolves.list.resolve2021(res);
  },
  cb2027: (res) => {
    userResolves.list.resolve2027(res);
  },
  cb2033: (res) => {
    userResolves.list.resolve2033(res);
  },

  // shopProductManageResolves
  cb2015: (res) => {
    shopProductManageResolves.list.resolve2015(res);
  },
  cb2032: (res) => {
    shopProductManageResolves.list.resolve2032(res);
  },
  cb2031: (res) => {
    shopProductManageResolves.list.resolve2031(res);
  },
  cb2018: (res) => {
    shopProductManageResolves.list.resolve2018(res);
  },
  cb2017: (res) => {
    shopProductManageResolves.list.resolve2017(res);
  },
  cb2012: (res) => {
    shopProductManageResolves.list.resolve2012(res);
  },
  cb2011: (res) => {
    shopProductManageResolves.list.resolve2011(res);
  },
  cb2010: (res) => {
    shopProductManageResolves.list.resolve2010(res);
  },
  cb2013: (res) => {
    shopProductManageResolves.list.resolve2013(res);
  },
  cb2014: (res) => {
    shopProductManageResolves.list.resolve2014(res);
  },
  cb2016: (res) => {
    shopProductManageResolves.list.resolve2016(res);
  },

  // productOrderManage
  cb2023: (res) => {
    productOrderManage.list.resolve2023(res);
  },
  cb2024: (res) => {
    productOrderManage.list.resolve2024(res);
  },

  // clientManage
  cb2020: (res) => {
    clientManage.list.resolve2020(res);
  },
}
