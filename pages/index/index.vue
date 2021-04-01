<template>
<!--	加个注释：首页 修改 修改-->
	<view class="container">
		<template v-for="(item, index) in list">
			<uni-card :is-full="true" :title="item.title" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" :extra="item.date" :note="`答卷数量: ${item.sonNum ? item.sonNum : 0}`" :is-shadow="true" class="uni-card" :key="item.id" @click="goDetails(item.id)"  v-if="index == 0">
				{{ item.title }}
			</uni-card>
			<view class="list-card" @click="goDetails(item.id)" :key="item.id" v-if="index != 0">
				<view class="card-l">
					<view class="card-name">{{ item.title }}</view>
					<view class="card-small-f">{{ item.date }}</view>
				</view>
				<view class="card-r">
					<view class="card-score">{{ item.sonNum ? item.sonNum : 0 }}</view>
					<view class="card-score-f card-small-f">答卷数量</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import { pageList } from '../../api/api.js'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				list: []
			}
		},
		onShow() {
			this.getPageList()
		},
		onPullDownRefresh() {
			console.log('刷新')
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			goDetails(id) {
				uni.navigateTo({
					url: `../details/details?id=${id}`
				})
			},
			getPageList(){
				pageList({
					pageIndex: 0
				}).then((data) => {
					console.log('请求后', data);
					let listArr = [];
					if(data.object.list.length > 0){
						for(let i = 0; i < data.object.list.length; i++){
							if(data.object.list[i].status == 1){
								listArr.push(data.object.list[i])
							}
						}
					}
					this.list = listArr;
				}).catch((error) => {
					console.log('失败', error);
				});
			}
			
		},
		mounted() {
			this.getPageList();
		}
	}
</script>

<style lang="scss">
	.list-card{
		display: flex;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
		border-radius: 3px;
		padding: 10px;
		margin-top: 20px;
		.card-l{
			flex: auto;
		}
		.card-r{
			width: 25%;
			padding-left: 8px 10px;
			text-align: center;
			border-left: 1px solid rgba(0, 0, 0, 0.2);
			.card-score{
				font-weight: bold;
				font-size: 17px;
				line-height: 24px;
				color: #53a8ff;
			}
		}
		.card-small-f{
			font-size: 12px;
			color: #999999;
		}
	}
</style>
