
import React, { PureComponent } from 'react'

class Square extends PureComponent {

  // onClick(index) {
  //   console.log('Square.onClick() called', 'index', index)
  //   this.props.handleClick(index)
  // }

  render() {
    return (
      <button
        className="square"
        onClick={this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square






// THIS CAN BE REPLACE BY A 'FUNCTIONAL COMPONENT'
//  NOTE: props. in stead of this.props,
//  NOTE: onClick in stead of onClick() otherwise executed immediately
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }
