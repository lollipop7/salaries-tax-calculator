import React, {Component} from 'react';
import {Modal, List, Flex} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';

import regionData from '../../data/region.js';
import './style.scss';

const Item = List.Item;
const Brief = Item.Brief;

class Regions extends Component {
  constructor(props) {
    super(props);
  }
  compomentDidMount(){
    console.log(this.props.isVisible)
  }
  componentWillUpdate(){
    console.log(this.props.isVisible)
  }
  render(){
    return (
      <div>
        <Modal
          visible={this.props.isVisible}
          closable={true}
          maskClosable={false}
          transparent={true}
          onClose={this.props.hideRegions}
          className="regions-modal"
        >
          <List>
            {regionData.map((item, index) => {
              return (
                <Item key={item}>
                  <Brief className="city-header">{item.nameStr}</Brief>
                  {(item.cityList).map((cityName, idx) => {
                    return (
                      <Flex.Item key={cityName}>{cityName}</Flex.Item>
                    )
                  })}
                </Item>
              )
            })}
          </List>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.Regions.isVisible
})

const mapDispatchToProps = dispatch => ({
  hideRegions: bindActionCreators(Actions.Regions.hideRegions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Regions);