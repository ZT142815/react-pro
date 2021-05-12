const urls = {
  // 登陆接口
  reqLogin: {
    method: 'post',
    url: '/login'
  },
  reqGetCategoryList: {
    method: 'get',
    url: '/manage/category/list'
  },
  reqAddCategory: {
    method: 'post',
    url: '/manage/category/add'
  },
  reqUpdataCategory: {
    method: 'post',
    url: 'manage/category/update'
  },
  reqGetProductList: {
    method: 'get',
    url: '/manage/product/list'
  },
  reqSearchProductList: {
    method: 'get',
    url: '/manage/product/search'
  },
  reqProductUpdataStatus: {
    method: 'post',
    url: '/manage/product/updateStatus'
  }
}

export default urls
