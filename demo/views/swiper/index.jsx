import React, { Component } from 'react'
import { Swiper } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'

const SwiperItem = Swiper.item

export default class Test extends Component {
	data = Data.getComponentItemInfo('swiper')
	
	afterChange (index) {
		console.log(index)
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo1">
					<Swiper className="swiper-wrap" afterChange={this.afterChange.bind(this)}>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#8bc34a' }}>第一面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#03a9f4' }}>第二面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#ff9800' }}>第三面板</SwiperItem>
					</Swiper>
				</DemoBlock>
				<DemoBlock title="循环播放" desc="demo2">
					<Swiper className="swiper-wrap" loop={true}>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#8bc34a' }}>第一面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#03a9f4' }}>第二面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#ff9800' }}>第三面板</SwiperItem>
					</Swiper>
				</DemoBlock>
				<DemoBlock title="修改轮播区域宽度" desc="demo3">
					<Swiper className="swiper-wrap" loop={true} childWidth={260}>
						<SwiperItem className="swiper-item" style={{ padding: '0 10px' }}>
							<div className="flex-center full" style={{ background: '#8bc34a' }}>第一面板</div>
						</SwiperItem>
						<SwiperItem className="swiper-item" style={{ padding: '0 10px' }}>
							<div className="flex-center full" style={{ background: '#03a9f4' }}>第二面板</div>
						</SwiperItem>
						<SwiperItem className="swiper-item" style={{ padding: '0 10px' }}>
							<div className="flex-center full" style={{ background: '#ff9800' }}>第三面板</div>
						</SwiperItem>
					</Swiper>
				</DemoBlock>
				<DemoBlock title="去除下标小圆点" desc="demo4 - 可以根据场景自己实现">
					<Swiper className="swiper-wrap" dots={false}>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#8bc34a' }}>第一面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#03a9f4' }}>第二面板</SwiperItem>
						<SwiperItem className="flex-center swiper-item" style={{ background: '#ff9800' }}>第三面板</SwiperItem>
					</Swiper>
				</DemoBlock>
			</PageModel>
		)
	}
}
