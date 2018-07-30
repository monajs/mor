import React, { Component } from 'react'
import { Carousel } from 'mona'

const CarouselItem = Carousel.item

export default class Test extends Component {
	render () {
		return (
			<Carousel>
				<CarouselItem>1</CarouselItem>
				<CarouselItem>2</CarouselItem>
				<CarouselItem>3</CarouselItem>
			</Carousel>
		)
	}
}
