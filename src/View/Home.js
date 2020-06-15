import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from '../Component/Card';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.porps = props;

        this.state = {
            cities: [
                {
                    id: 1668341,
                    cityName: '台北市',
                },
                {
                    id: 1665148,
                    cityName: '新北市',
                },
                {
                    id: 1667905,
                    cityName: '桃園市',
                },
                {
                    id: 1668399,
                    cityName: '台中市',
                },
                {
                    id: 1668355,
                    cityName: '台南市',
                },
                {
                    id: 1673820,
                    cityName: '高雄市',
                },
            ],
            newCities: [],
        };
    }

    componentDidMount() {
        const { cities } = this.state;
        const citiesId = cities.map((ele) => ele.id).toString();
        axios.get(`http://api.openweathermap.org/data/2.5/group?id=${citiesId}&appid=f9ad7befd01af9bb1f8b127796ab70a6&lang=zh_tw&units=metric`)
            .then((response) => {
                response.data.list.map((list) => {
                    cities.map((city) => {
                        if (list.id === city.id) {
                            const newElement = {
                                id: list.id,
                                cityName: city.cityName,
                                lon: list.coord.lon,
                                lat: list.coord.lat,
                                sunrise: list.sys.sunrise,
                                sunset: list.sys.sunset,
                                temp: list.main.temp,
                                tempMax: list.main.temp_max,
                                tempMin: list.main.temp_min,
                                feelsLike: list.main.feels_like,
                                humidity: list.main.humidity,
                                description: list.weather[0].description,
                            };

                            this.setState((prevState) => ({
                                newCities: [...prevState.newCities, newElement],
                            }));
                        }

                        return false;
                    });

                    return false;
                });
            });
    }

    render() {
        const { newCities } = this.state;
        return (
            <div>
                <Title>六都天氣小卡</Title>
                <CitiesContainer>
                    {
                        newCities.map((city) => <Card city={city} />)
                    }
                </CitiesContainer>
            </div>
        );
    }
}

export default Home;

const Title = styled.h1`
    text-align: center;
`;

const CitiesContainer = styled.div`
    display: flex;
    margin: 0 auto;
    width: 1170px;
    flex-wrap: wrap;
`;
