import React, { useMemo, useRef } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { addCategory, getCatecoryList } from '../customhooks'

const AddCategoryDialog = (props) => {
  const formRef = useRef(null)

  // 确定添加
  const handleOk = async () => {
    const formValue = formRef.current.getFieldsValue()
    if (formValue.categoryName) {
      const result = await addCategory(
        formValue.parentId,
        formValue.categoryName
      )
      if (result) {
        props.setShowAddDialog(false)
        formRef.current.resetFields()
      }
      const res = await getCatecoryList(props.parentId)
      props.setTableData(res)
    }
  }

  // 取消添加
  const handleCancel = () => {
    formRef.current.resetFields()
    props.setShowAddDialog(false)
  }

  return (
    <Modal
      title="添加分类"
      visible={props.isShow}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="control-hooks" ref={formRef}>
        <Form.Item name="parentId" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            defaultValue="一级分类"
            allowClear
          >
            <Option value="一级分类">一级分类</Option>
            {props.selectData &&
              props.selectData.map((item) => {
                return <Option value={item._id}>{item.name}</Option>
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="categoryName"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('分类名称必须输入'))
                }
                return Promise.resolve()
              }
            })
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddCategoryDialog
