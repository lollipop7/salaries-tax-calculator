import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, List, Picker, Checkbox} from 'antd-mobile';
import * as Actions from '../../Actions';
import childrenEduData from '../../data/children-edu.js';
import oldSupportData from '../../data/old-support.js';
import continuingEduData from '../../data/continuing-edu.js';
import './style.scss'

const CheckboxItem = Checkbox.CheckboxItem;

class Deduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenEduValue: ['半数抵扣'],
      oldSupportValue: ['1人赡养'],
      continuingEduValue: ['教育期间']
    };
  }
  componentWillUpdate(){
    console.log(this.props.isVisible)
  }
  render() {
    return (
      <div>
      <Modal
          visible={this.props.isVisible}
          closable={true}
          maskClosable={false}
          transparent={true}
          onClose={this.props.hideDeduct}
          animationType="slide-up"
          className="deduct-modal"
        >
          <div className="custom-list">
            <List>
              <h3>个税专项附加扣除</h3>
              <Picker
                title="子女教育"
                data={childrenEduData}
                cols={1}
                value={this.state.childrenEduValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="childrenEdu"
                  arrow="down"
                >
                  子女教育
                </CheckboxItem>
              </Picker>
              <Picker
                title="赡养老人"
                data={oldSupportData}
                cols={1}
                value={this.state.oldSupportValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="oldSupport"
                  arrow="down"
                >
                  赡养老人
                </CheckboxItem>
              </Picker>
              <Picker
                title="继续教育"
                data={continuingEduData}
                cols={1}
                value={this.state.continuingEduValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="continuingEdu"
                  arrow="down"
                >
                  继续教育
                </CheckboxItem>
              </Picker>
              <CheckboxItem 
                className="lt-checkbox"
                key="medical"
                onChange={v=>{console.log(v)}}
              >
                大病医疗
              </CheckboxItem>
            </List>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.Deduct.isVisible
})

const mapDispatchToProps = dispatch => ({
  hideDeduct: bindActionCreators(Actions.Deduct.hideDeduct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Deduct);