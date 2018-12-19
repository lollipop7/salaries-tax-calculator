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
    this.handleSetArea = this.handleSetArea.bind(this)
  }

  compomentDidMount(){
    console.log(this.props.isVisible)
  }
  componentWillUpdate(){
    console.log(this.props.isVisible)
  }

  handleSetArea(e){
    let cityname = e.target.dataset.cityName;
    this.props.setArea(cityname);
    this.props.hideRegions();
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
          popup
          animationType="slide-up"
          className="regions-modal"
          wrapClassName="regions-modal-wrap"
        >
          <List className="regions-list">
            {regionData.map((item, index) => {
              return (
                <Item key={index}>
                  <Brief>{item.nameStr}</Brief>
                  <Flex 
                    className="city-list"
                    justify="around"
                  >
                    {(item.cityList).map((cityObj, idx) => {
                      return (
                        <Flex.Item 
                          key={idx} 
                          className={`city-item ${cityObj.hot ? 'spec' : ''}`}
                          onClick={this.handleSetArea}
                          data-city-name={cityObj.area}
                        >{cityObj.area}
                        </Flex.Item>
                      )
                    })}
                  </Flex>
                  
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
  hideRegions: bindActionCreators(Actions.Regions.hideRegions, dispatch),
  setArea: bindActionCreators(Actions.Regions.setArea, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Regions);