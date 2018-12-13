import React, {Component} from 'react';
import {Modal, List, Checkbox, Toast } from 'antd-mobile';

const prompt = Modal.prompt;

class Deduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2: false,
    };
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  render() {
    return (
      <div>
      <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))}
            <List.Item>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}

export default Deduct;