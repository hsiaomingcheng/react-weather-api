import React from 'react';
import styled from 'styled-components';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.porps = props;

        this.hundleCovertSecond = this.hundleCovertSecond.bind(this);
    }

    /* eslint-disable-next-line class-methods-use-this */
    hundleCovertSecond(second) {
        return new Date((second + (8 * 3600)) * 1000).toISOString().substr(11, 8);
    }

    render() {
        const { city } = this.props;

        const sunrise = city.sunrise && this.hundleCovertSecond(city.sunrise);
        const sunset = city.sunset && this.hundleCovertSecond(city.sunset);

        return (
            <CardContainer backgroundImagePath={city.id}>
                <CardHead>
                    <CityName>{city && city.cityName}</CityName>
                    <div>
                        <div className="temp">現在溫度：{city.temp}˚C</div>
                        <div className="feelLike">體感溫度：{city.feelsLike}˚C</div>
                        <div className="humidity">濕度：{city.humidity}%</div>
                    </div>
                </CardHead>
                <div className="description">{city.description}</div>
                <div className="sunrise">日出：{sunrise}</div>
                <div className="sunset">日落：{sunset}</div>
            </CardContainer>
        );
    }
}

export default Card;

const CityName = styled.div`
    font-size: 30px;
`;

const CardHead = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CardContainer = styled.div`
    position: relative;
    margin: 30px;
    border-radius: 15px;
    padding: 15px;
    background: rgba(0, 0, 0, .5);
    width: 300px;
    color: #FFF;
    overflow: hidden;

    &:hover:after {
        background-size: 105%;
    }

    &:after {
        position: absolute;
        display: block;
        background: url(${(props) => `/assets/image/${props.backgroundImagePath}.jpg`}) center center no-repeat;
        background-size: 100%;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        opacity: 0.8;
        transition: all .5s ease;
        content: '';
    }
`;
