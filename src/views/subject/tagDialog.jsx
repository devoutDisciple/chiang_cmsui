import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Row, Button, message } from 'antd';
import request from '@utils/AxiosRequest';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};

const colors = [
	{
		id: 1,
		color: '#3f7735',
		background: '#f4fcf7',
	},
	{
		id: 2,
		color: '#d08152',
		background: '#fefaf7',
	},
];

// background: #f4fcf7;
//     color: #3f7735;

export default ({ controllerDialog, data, onSearch }) => {
	const [form] = Form.useForm();
	const { validateFields } = form;
	const [tags, setTags] = useState([]);

	useEffect(() => {
		if (data.tags) {
			const newTags = JSON.parse(data.tags);
			setTags([...newTags]);
		}
	}, [data]);

	const addTag = async () => {
		const values = await validateFields(['text', 'style']);
		if (!values.text || !values.style) return message.warning('请输入');
		const currentStyle = colors.filter((item) => item.id === values.style)[0];
		const tag = {
			text: values.text,
			color: currentStyle.color,
			background: currentStyle.background,
		};
		tags.push(tag);
		setTags([...tags]);
	};

	const removeTag = (idx) => {
		const newTags = [...tags];
		newTags.splice(idx, 1);
		setTags(newTags);
	};

	const handleOk = async () => {
		request.post('/subject/addTags', { id: data.id, tags }).then(() => {
			message.success('修改成功');
			controllerDialog();
			onSearch();
		});
	};

	return (
		<Modal className={styles.dialog} title="标签管理" visible onOk={handleOk} onCancel={controllerDialog}>
			<Form form={form} {...formLayout} layout="inline">
				<Row className={styles.form_row}>
					<FormItem name="text" label="标签">
						<Input placeholder="请输入标签" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem className="img" name="style" label="样式">
						<Select style={{ width: '100%' }} placeholder="请选择">
							{colors.map((item, index) => (
								<Option key={index} value={item.id}>
									<div style={{ color: item.color, background: item.background }}>测试</div>
								</Option>
							))}
						</Select>
					</FormItem>
				</Row>
				<Row className={styles.tag_btn}>
					<Button onClick={addTag}>添加标签</Button>
				</Row>
				<Row className={styles.tag_content}>
					{tags.map((item, index) => (
						<div
							key={index}
							className={styles.tag}
							style={{ color: item.color, background: item.background }}
						>
							{item.text}
							<span className={styles.tag_close} onClick={() => removeTag(index)}>
								<CloseCircleOutlined />
							</span>
						</div>
					))}
				</Row>
			</Form>
		</Modal>
	);
};
