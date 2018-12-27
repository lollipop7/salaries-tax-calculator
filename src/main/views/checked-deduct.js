import React, {Component} from 'react';
import {Modal, List} from 'antd-mobile';

import * as Actions from '../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Item = List.Item;

class CheckedDeduct extends Component {
  
  render() {
    const {
      checked_deduct
    } = this.props;
    return (
      <Modal
        visible={this.props.isVisible}
        closable={true}
        maskClosable={true}
        transparent={true}
        onClose={this.props.hideCheckedDeduct}
        animationType="slide-up"
        className="deduct-modal"
      >
        <div className="custom-list">
          <List>
            { checked_deduct &&
              checked_deduct.map((item, index)=>{
                if(item.checked){
                  return (
                    <Item key={index}>{item.value}</Item>
                  )
                }
              })
            }
          </List>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.Main.isVisible,
  checked_deduct: state.Deduct.checked_deduct
})

const mapDispatchToProps = dispatch => ({
  hideCheckedDeduct: bindActionCreators(Actions.Main.hideCheckedDeduct, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckedDeduct);