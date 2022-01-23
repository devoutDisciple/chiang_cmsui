import React from 'react';
import { Modal, Form, Row, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from '@utils/AxiosRequest';
import styles from './index.less';

const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};
export default ({ controllerDialog, onSearch }) => {
	const [form] = Form.useForm();

	const { validateFields } = form;

	const handleOk = async () => {
		const values = await validateFields(['name', 'file']);
		const filename = values.file.fileList[0].response.data;
		const params = { name: values.name, photo: filename };
		await request.post('/order/add', params);
		message.success('新增成功');
		onSearch();
		controllerDialog();
	};

	const handleCancel = controllerDialog;

	return (
		<Modal className={styles.dialog} title="新增教师" visible onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} {...formLayout} layout="inline">
				<Row className={styles.form_row}>
					<FormItem name="name" label="教师名称" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="file" label="图片" rules={[{ required: true }]}>
						<Upload
							defaultFileList={[]}
							maxCount={1}
							name="file"
							action="/order/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
							<div className={styles.img_tip}>*为使图片不变形，需上传图片宽高1:1的图片</div>
						</Upload>
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};
