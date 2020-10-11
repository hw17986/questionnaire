
let baseURL = 'http://120.76.124.237:8091/';
export default function unirequest(options) {
	let { method, url, data, headers } = options;
	let config = {
		url: baseURL + url,
		method: method || 'GET',
		header: headers || { 'Content-Type': 'application/json' },
		data: data || {},
	}
	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			success: (res) => {
				if(res.data.code === 0) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: '请求异常',
						icon: 'none'
					});
				}
			},
			fail: (error) => {
				reject(error);
			}
		})
	})
}
