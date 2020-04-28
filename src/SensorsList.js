import React, {Component} from 'react';
import axios from 'axios';
import { List } from 'antd';

/**
 *
 *
 * @class SensorsList
 * @extends {Component}
 */
class SensorsList extends Component {

  state = {
    sensors: []
  }

  componentDidMount() {
    axios.get('http://192.168.0.17/api/v1/sensors')
      .then(response => {
        this.setState({sensors: response.data._items})
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <List 
        itemLayout='horizontal'
        dataSource={this.state.sensors}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta 
              title={item._id}
              description={item.name}
            />
          </List.Item>
        )}
      />
    )
  }
}

export {SensorsList};
