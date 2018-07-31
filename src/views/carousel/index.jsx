import React, { Component } from 'react'
import { Carousel } from 'mona'

const CarouselItem = Carousel.item

export default class Test extends Component {
	render () {
		return (
			<div>
				<div className="carousel-pannel w-full">
					<Carousel loop={true}>
						<CarouselItem>
							<img className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
						</CarouselItem>
						<CarouselItem>
							<img className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
						</CarouselItem>
						<CarouselItem>
							<img className="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
						</CarouselItem>
					</Carousel>
				</div>
			</div>
		)
	}
}
