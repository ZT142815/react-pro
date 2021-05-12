import { message } from 'antd';
// 获取一级或二级分类列表
export const getCatecoryList = (id = '') => {
  return new Promise((resolve) => {
    httpUtil.external('reqGetCategoryList', { parentId: id })
      .then((res) => {
        if (res.status === 0) {
          resolve(res.data)
        }
      })
  })
};

// 添加分类
export const addCategory = (id = '0', name, isEdit=false) => {
  let postData = {
    parentId: id,
    categoryName: name
  }
  const url = isEdit ? 'reqUpdataCategory' : 'reqAddCategory';
  return new Promise((resolve) => {
    httpUtil.external(url, postData)
      .then((res) => {
        if (res.status === 0) {
          message.success('成功');
          resolve(true)
        } else {
          message.error(res.msg);
          resolve(false)
        }
      })
  })
}