import React, { useEffect, useState } from 'react'
import './index.less'
import { Card, Button, Table } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { getCatecoryList } from './customhooks'
import AddCategoryDialog from './components/addCategoryDialog'
import UpdataCategoryDialog from './components/updataCategoryDialog'

const Category = () => {
  const [tableData, setTableData] = useState()
  const [selectData, setSelectData] = useState()
  const [parentId, setParentId] = useState('0')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showUpdataDialog, setShowUpdataDialog] = useState(false)
  const [subTitle, setSubTitle] = useState('')

  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
      key: '_id',
      width: '80%'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              editCategory(text)
            }}
          >
            修改分类
          </Button>
          {parentId === '0' ? (
            <Button type="link" onClick={() => getChildCategory(text)}>
              查看子分类
            </Button>
          ) : null}
        </div>
      )
    }
  ]

  useEffect(() => {
    ;(async function getData() {
      const result = await getCatecoryList()
      setTableData(result)
      setSelectData(result)
    })()
  }, [])

  // 查看子分类
  const getChildCategory = async (e) => {
    setParentId(e._id)
    const result = await getCatecoryList(e._id)
    setTableData(result)
    setSubTitle(e.name)
  }

  // 添加分类
  const addCategory = () => {
    setShowAddDialog(true)
  }
  // // 编辑分类
  // const editCategory = (e) => {
  //   setSubTitle(e)
  //   setShowUpdataDialog(true)
  // }

  const title =
    parentId === '0' ? (
      '一级分类列表'
    ) : (
      <span>
        <Button
          type="link"
          style={{ fontSize: '18px', paddingLeft: '0' }}
          onClick={() => {
            returnCrubm()
          }}
        >
          一级分类列表
        </Button>
        <RightOutlined />
        <span style={{ padding: '0 12px' }}>{subTitle}</span>
      </span>
    )

  const returnCrubm = async () => {
    const result = await getCatecoryList()
    setParentId('0')
    setTableData(result)
  }

  return (
    <div className="category-container">
      <Card
        size="small"
        title={title}
        extra={
          <Button type="primary" onClick={addCategory} icon={<PlusOutlined />}>
            添加
          </Button>
        }
        style={{ width: 300 }}
      >
        <Table
          bordered
          rowKey="_id"
          loading={false}
          columns={columns}
          dataSource={tableData}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <AddCategoryDialog
          selectData={selectData}
          isShow={showAddDialog}
          parentId={parentId}
          setTableData={setTableData}
          data={tableData}
          setShowAddDialog={setShowAddDialog}
        />
        {/* <UpdataCategoryDialog
          selectData={selectData}
          isShow={showUpdataDialog}
          setTableData={setTableData}
          setShowUpdataDialog={setShowUpdataDialog}
          subTitle={subTitle}
        /> */}
      </Card>
    </div>
  )
}

export default Category
