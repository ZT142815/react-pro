import React, { useEffect, useState } from 'react';
import { Card, Select, Input, Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getProductList, productUpdataStatus } from '../customhooks';
import { withRouter } from 'react-router';

const { Option } = Select;

const CommodityHome = (props) => {
	const [tableState, setTableState] = useState({
		pageNum: 1,
		pageSize: 3,
		searchType: 'productName',
		searchValue: ''
	});
	const [tableData, setTableData] = useState({
		tableData: [],
		total: 0
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getTableData();
	}, [tableState.pageNum]);

	// 定义获取表格数据方法
	const getTableData = async () => {
		setLoading(true);
		const data = await getProductList(tableState);
		setTableData(data);
		setLoading(false);
	};

	// 切换搜索类型
	const selectChange = (value) => {
		setTableState(Object.assign({ ...tableState, searchType: value }));
	};

	// 输入框内容改变
	const inputChange = (e) => {
		setTableState(
			Object.assign({ ...tableState, searchValue: e.target.value })
		);
	};

	// 切换分页
	const pageChange = (pageNum, pageSize) => {
		setTableState(Object.assign({ ...tableState, pageNum: pageNum }));
	};

	// 点击搜索按钮
	const buttonClick = () => {
		getTableData(tableState);
	};

	// 点击详情按钮跳转页面
	const detailHandle = (data) => {
		props.history.push('/product/detail', { data });
	};

	// 商品上下架处理
	const productHandle = async (value) => {
		console.log(value);
		const { _id } = value;
		const status = value.status === 1 ? 2 : 1;
		const result = await productUpdataStatus(_id, status);
		if (result) {
			message.success('更新商品状态成功');
			// 刷新当前页面
			getTableData();
		}
  };
  
  // 添加商品
  const addProduct = () => {
    props.history.push('/product/addupdata')
  }

	const columns = [
		{
			title: '商品名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '商品描述',
			dataIndex: 'desc',
			key: 'desc'
		},
		{
			title: '商品价格',
			dataIndex: 'price',
			key: 'price',
			render: (text) => <span>{text}元</span>
		},
		{
			title: '状态',
			key: 'status',
			render: (text) => (
				<span>
					<Button
						type='primary'
						style={{ marginRight: '12px' }}
						onClick={() => {
							productHandle(text);
						}}
					>
						{text.status === 1 ? '下架' : '上架'}
					</Button>
					<span>{text.status === 1 ? '在售' : '已下架'}</span>
				</span>
			)
		},
		{
			title: '操作',
			key: 'actions',
			render: (text, record) => (
				<div>
					<Button
						type='link'
						style={{ padding: '4px 10px' }}
						onClick={() => {
							detailHandle(text);
						}}
					>
						详情
					</Button>
					<Button type='link' style={{ padding: '4px 10px' }}>
						修改
					</Button>
				</div>
			)
		}
	];
	// card头部数据
	const cardData = {
		title: (
			<span>
				<Select
					defaultValue='productName'
					style={{ width: '120px' }}
					onChange={selectChange}
				>
					<Option value='productName'>按名称搜索</Option>
					<Option value='productDesc'>按描述搜索</Option>
				</Select>
				<Input
					style={{ width: '300px', margin: '0 16px' }}
					onChange={inputChange}
					onPressEnter={buttonClick}
				></Input>
				<Button type='primary' onClick={buttonClick}>
					搜索
				</Button>
			</span>
		),
		extra: (
			<Button type='primary' icon={<PlusOutlined />} onClick={addProduct}>
				添加商品
			</Button>
		)
	};

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Card
				title={cardData.title}
				extra={cardData.extra}
				style={{ width: '100%', height: '100%' }}
			>
				<Table
					rowKey='_id'
					loading={loading}
					bordered
					dataSource={tableData.tableData}
					columns={columns}
					pagination={{
						showQuickJumper: true,
						pageSize: tableState.pageSize,
						total: tableData.total,
						onChange: pageChange
					}}
				/>
			</Card>
		</div>
	);
};

export default withRouter(CommodityHome);
