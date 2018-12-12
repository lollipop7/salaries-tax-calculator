import React, {Component} from 'react';
import {Modal, List, Checkbox, Toast } from 'antd-mobile';

const prompt = Modal.prompt;

class Deductions extends Component {
  render() {
    return (
      prompt('input name', 'please input your name',
        [
          {
            text: 'Close',
            onPress: value => new Promise((resolve) => {
              Toast.info('onPress promise resolve', 1);
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
              }, 1000);
            }),
          },
          {
            text: 'Hold on',
            onPress: value => new Promise((resolve, reject) => {
              Toast.info('onPress promise reject', 1);
              setTimeout(() => {
                reject();
                console.log(`value:${value}`);
              }, 1000);
            }),
          },
        ], 'default', null, ['input your name'])
    )
  }
}

export default Deductions;