// 获取商品列表方法
export const getProductList = (tableState) => {
  const { pageSize, pageNum, searchType, searchValue } = tableState;
  const postData = {
    pageNum,
    pageSize,
    [searchType]:searchValue
  }
  const url = searchValue==='' ? 'reqGetProductList' : 'reqSearchProductList'
	return new Promise((resolve) => {
		httpUtil.external(url, postData).then((res) => {
			if (res.status === 0) {
				const result = res.data;
				const total = result.total;
				const tableData = result.list;
				resolve({ total, tableData });
			}
		});
	});
};

// 商品上下架处理
export const productUpdataStatus = (id,status) => {
  const postData = {
    productId: id,
    status: status
  }
  return new Promise((resolve)=>{
    httpUtil.external('reqProductUpdataStatus',postData).then((res)=>{
      if(res.status===0) {
        resolve(true)
      }
    })
  })
}
