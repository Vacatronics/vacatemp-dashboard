import React, { Component } from 'react';
import axios from 'axios';
import { List, Row, Col } from 'antd';
import { PieChart, Pie, Sector, LineChart, YAxis, CartesianGrid, XAxis, Line, Tooltip } from 'recharts';


/**
 *
 *
 * @class Sensors
 * @extends {Component}
 */
class Sensors extends Component {

  state = {
    sensors: [],
    data: []
  }

  getSensors = () => {
    axios.get('/api/v1/sensors')
      .then(response => this.getData(response.data._items))
      .catch(err => {
        console.log(err);
      })
  }

  getData = (sensors) => {
    axios.get('/api/v1/temperatures?sort=-_created&max_results=90')
      .then(response => this.setState({ data: response.data._items, sensors }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getSensors();
  }

  activeShape = (props) => {
    const {cx, cy, fill, innerRadius, outerRadius, startAngle, endAngle, value} = props;
    return (
      <g>
        <text x={cx} y={cy} fill={fill} textAnchor='middle'>
          {`${value.toFixed(2)} ºC`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  tooltipContent = ({active, payload, label}) => {
    if (active) {
      return (
        <div 
          style={{
            backgroundColor: payload[0].fill, 
            color: payload[0].color,
            padding: '10px'
          }}
        >
          <p>{`Data: ${label}`}</p>
          <p>{`Temp: ${payload[0].value} ºC`}</p>
        </div>
      )
    }
  }

  renderItem = item => {
    const data = this.state.data.filter(x => x.sensor === item._id)
                    .sort((a, b) => a._created > b._created)
    const last = data[0]
    const values = [
      { name: item._id, value: last.temperature },
    ]
    const color = last.temperature < 10 ? '#1979a9' : 
                  last.temperature < 20 ? '#33cc33' :
                  last.temperature < 30 ? '#ffff80' : '#ff6600'

    return (
      <List.Item>
        <List.Item.Meta
          title={`Sensor ${item._id}`}
        />
        <Row gutter={8}>
          <Col span={8}>
            <PieChart width={200} height={150}>
              <Pie
                data={values}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={70}
                fill={color}
                paddingAngle={5}
                dataKey='value'
                activeShape={this.activeShape}
                activeIndex={0}
              >
              </Pie>
            </PieChart>
          </Col>

          <Col span={16}>
            <LineChart 
              width={600} 
              height={150}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_created" />
              <YAxis />
              <Tooltip content={this.tooltipContent}/>
              <Line dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Col>
        </Row>
      </List.Item>
    )
  }

  render() {
    return (
      <List
        itemLayout='vertical'
        dataSource={this.state.sensors}
        renderItem={this.renderItem}
      />
    )
  }
}

export { Sensors };
