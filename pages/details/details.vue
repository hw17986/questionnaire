<template>
	<view class="container">
		<swiper class="swiper" :style="{ height: cloneHeight }" :current="currentNum" @change="changeSwiper">
			<swiper-item class="swiper-items" v-for="(item, index) in list" :key="`list${index}`">
				<view class="swiper-item uni-bg-red">
					<view class="details-name">{{ `${index + 1}，${item.title}` }}</view>
					<radio-group class="details-items" @change="radioChange($event, index)">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(items, index) in item.answers" :key="items.id">
							<view>
								<radio :value="items.id.toString()" :checked="index === current" />{{items.answer}}
							</view>
						</label>
					</radio-group>
					<button type="primary" class="submit-btn" v-if="index == list.length - 1" @click="submitResult">提交</button>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { detail, submitAnswer } from '../../api/api.js'
	export default {
		data() {
			return {
				list: [],
				resultArr: [],  // 选中的每项id
				current: null,
				cloneHeight: '100%',
				currentNum: 0
			};
		},
		methods: {
			changeSwiper(event) {
				this.currentNum = event.detail.current;
			},
			radioChange(evt, index) {
				console.log(evt, index)
				this.resultArr[index] = evt.detail.value;;
				if(this.currentNum >= this.list.length - 1 ) {
					return;
				}
				this.currentNum++;
			},
			submitResult() {
				console.log(this.resultArr);
				let thisResultArr = this.resultArr.filter(item => item != undefined);
				if(thisResultArr.length < this.list.length) {
					uni.showModal({
						title: '提示',
						content: '还有未完成题目，请完成！',
					})
				} else {
					// 提交答案id集合
					
					// uni.request({
					//     url: 'http://192.168.1.3:8091/api/applet/submitAnswer', //仅为示例，并非真实接口地址。
					// 	method:'POST',
					//     data: thisResultArr,
					//     header: {
					//         'Content-Type': 'application/json' //自定义请求头信息
					//     },
					//     success: (res) => {
					//         console.log(res.data);
					// 		uni.showModal({
					// 			title: '提示',
					// 			content: '您的答卷已经提交感谢您的参与！',
					// 			showCancel: false,
					// 			success: function(res) {
					// 				let page = getCurrentPages().length; // //当前页面栈
					// 				uni.navigateBack({
					// 					delta: page
					// 				})
					// 			}
					// 		});
					//     }
					// });
					submitAnswer(thisResultArr).then((res) => {
						console.log('提交',res)
						uni.showModal({
							title: '提示',
							content: '您的答卷已经提交感谢您的参与！',
							showCancel: false,
							success: function(res) {
								let page = getCurrentPages().length; // //当前页面栈
								uni.navigateBack({
									delta: page
								})
							}
						});
					}).catch((err) =>{
						console.log('err',err)
					})
				}
			}
		},
		onLoad(option) {
			// 获取问卷详情
			detail({
				id: option.id
			})
			.then((data) => {
				// 题目项
				this.list = data.object.list;
				uni.setNavigationBarTitle({
					title: data.object.title
				})
			}).catch((err) => {
				console.log('详情错误', err)
			})
		},
		onReady() {
			// 设置swiper的高度，swiper默认150px，不动态设置的话会遮掩调子元素内容
			// let view = uni.createSelectorQuery().select('.swiper-item');
			// console.log('swiper', view);
			// view.fields({
			// 	size: true
			// }, data => {
			//   console.log("得到节点信息" + JSON.stringify(data));
			//   this.cloneHeight = data.height;
			// }).exec();
		}
	}
</script>

<style lang="scss">
.details-items{
	margin-top: 20px;
	.uni-list-cell{
		margin: 10px;
	}
}
.swiper-items{
	.submit-btn{
		position: absolute;
		width: 100%;
		bottom: 20px;
	}
}
</style>
