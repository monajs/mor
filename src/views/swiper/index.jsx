import React, { Component } from 'react'
import { Swiper } from 'mona'

const SwiperItem = Swiper.item

export default class Test extends Component {
	afterChange (index) {
		// console.log(index)
	}
	
	test () {
		// console.log(123)
	}
	
	render () {
		return (
			<div>
				<div className="swiper-pannel w-full">
					<Swiper afterChange={this.afterChange.bind(this)} loop={false}>
						<SwiperItem>
							<img onClick={this.test.bind(this)} className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
						</SwiperItem>
						<SwiperItem>
							<img className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
						</SwiperItem>
						<SwiperItem>
							<img className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
						</SwiperItem>
					</Swiper>
				</div>
			</div>
		)
	}
}
