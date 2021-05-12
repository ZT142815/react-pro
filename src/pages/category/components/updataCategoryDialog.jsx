import React, { useMemo, useRef, useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { addCategory, getCatecoryList } from '../customhooks'

const UpdataCategoryDialog = (props) => {
  const subTitle = Object.assign(props.subTitle)
  const formRef = useRef(null)

  // 确定添加
  const handleOk = async () => {
    const formValue = formRef.current.getFieldsValue()
    if (formValue.categoryName) {
      const result = await addCategory(
        subTitle._id,
        formValue.categoryName,
        true
      )
      if (result) {
        props.setShowUpdataDialog(false)
        formRef.current.resetFields()
      }
      const res = await getCatecoryList(props.parentId)
      props.setTableData(res)
    }
  }

  // 取消添加
  const handleCancel = () => {
    props.setShowUpdataDialog(false)
    formRef.current.resetFields()
  }

  return (
    <Modal
      title="更新分类"
      visible={props.isShow}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {useMemo(() => {
        return (
          <Form name="control-hooks" ref={formRef}>
            <Form.Item
              name="categoryName"
              initialValue={subTitle.name}
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
        )
      }, [props])}
    </Modal>
  )
}

export default UpdataCategoryDialog
