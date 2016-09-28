import React, { Component } from 'react' 
import { EditableItem } from './EditableItem'
import { SeparatedItemList } from './SeparatedItemList'

export class ListEditableItems extends Component {
  constructor() {
    super();
    this.state = {activeElement:undefined};
  }



  _renderer(item, index, itemId, textFieldRegistration, nextFunction, currentFocus) {
    return <EditableItem
      key={index}
      textFieldRegistration={textFieldRegistration}
      currentFocus={currentFocus}
      nextFunction={nextFunction}
      elementIndex={index}
      activeElement={this.state.activeElement}
      setActiveElement={() => {this.setState({activeElement: index})}}
      {...item}
    />
  }

  render() {
    let items = this.props.items;
    return (
      <SeparatedItemList
        items={items}
        separatorIndent={this.props.separatorIndent}
        renderer={this._renderer.bind(this)}
        focusOnLoad={this.props.focusOnLoad}
      />
    );
  }
}
