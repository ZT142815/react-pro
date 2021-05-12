import React from 'react';
import { Card, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

const CommodityDetail = (props) => {
  const { data } = props.history.location.state;
  const returnHandle = () => {
    props.history.goBack('/product')
  }
	const title = (
		<span>
			<ArrowLeftOutlined
        style={{ color: '#1da57a', marginRight: '16px', fontSize: '20px' }}
        onClick={returnHandle}
			/>
			<span>商品详情</span>
		</span>
	);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Card title={title} style={{ width: '100%', height: '100%' }}>
				<List>
					<List.Item>
						<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
							商品名称：
						</span>
						<span>{data.name}</span>
					</List.Item>
					<List.Item>
						<div>
							<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
								商品描述：
							</span>
							<span>{data.desc}</span>
						</div>
					</List.Item>
					<List.Item>
						<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
							商品价格：
						</span>
						<span>{data.price}元</span>
					</List.Item>
					<List.Item>
						<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
							所属分类：
						</span>
						<span>findX3</span>
					</List.Item>
					<List.Item>
						<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
							商品图片：
						</span>
						{data.imgs.map((item) => {
							return (
								<img
									style={{ width: '150px' }}
									src={`http://localhost:5000/upload/${item}`}
								></img>
							);
						})}
					</List.Item>
					<List.Item>
						<span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
							商品详情：
						</span>
						<span dangerouslySetInnerHTML={{ __html: data.detail }}></span>
					</List.Item>
				</List>
			</Card>
		</div>
	);
};

export default withRouter(CommodityDetail);
