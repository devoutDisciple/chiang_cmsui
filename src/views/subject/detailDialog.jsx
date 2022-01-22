import React, { useEffect } from 'react';
import { Modal, Form, message, Upload, Button } from 'antd';
import request from '@utils/AxiosRequest';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.less';

const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};

export default ({ controllerDialog, onSearch, detailId, editData }) => {
	const [form] = Form.useForm();
	const { validateFields, setFieldsValue } = form;

	useEffect(() => {
		setFieldsValue({
			url: editData.url,
			detail: editData.detail_urls,
			signup: editData.signup_urls,
			teacher: editData.teacher_urls,
		});
	}, [editData, setFieldsValue]);

	const filterUrl = (data) => {
		const urls = [];
		if (data && data.fileList) {
			data.fileList.forEach((item) => {
				if (item.response) {
					urls.push(item.response.data);
				} else {
					urls.push(item.url);
				}
			});
		}
		if (Array.isArray(data)) {
			data.forEach((item) => {
				urls.push(item.url);
			});
		}
		return urls;
	};

	const handleOk = async () => {
		const values = await validateFields(['url', 'detail', 'teacher', 'signup']);
		const { detail, signup, teacher, url } = values;
		const detail_urls = filterUrl(detail);
		const signup_urls = filterUrl(signup);
		const teacher_urls = filterUrl(teacher);
		const urls = filterUrl(url)[0];
		const res = await request.post('/subject/updateDetailImgs', {
			detailId,
			urls,
			detail_urls,
			signup_urls,
			teacher_urls,
		});
		if (res.data === 'success') {
			message.success('修改成功');
			onSearch();
			controllerDialog();
		}
	};

	return (
		<Modal className={styles.dialog} width="800px" title="详情" visible onOk={handleOk} onCancel={controllerDialog}>
			<Form form={form} {...formLayout} layout="inline">
				<div className={styles.img}>
					<FormItem name="url" label="详情图片">
						<Upload
							name="file"
							defaultFileList={editData.url}
							maxCount={1}
							action="/subject/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
					<FormItem className="img" name="detail" label="课程详情">
						<Upload
							name="file"
							defaultFileList={editData.detail_urls}
							multiple
							action="/subject/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
					<FormItem className="img" name="teacher" label="师资团队">
						<Upload
							name="file"
							defaultFileList={editData.teacher_urls}
							multiple
							action="/subject/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
					<FormItem className="img" name="signup" label="报名须知">
						<Upload
							name="file"
							defaultFileList={editData.signup_urls}
							multiple
							action="/subject/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
				</div>
			</Form>
		</Modal>
	);
};
