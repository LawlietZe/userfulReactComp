import React, { PureComponent } from React
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Callout extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      showPopup: false
    }
    this.popupOnceShown = false
  }
  preventPopupHide = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }
  hidePopup = ()=> {
    if(this.state.showPopup) {
      this.setState({showPopup: false})
      this.toggleShow(false)
      document.removeEventListener('click', this.onDocumentClick)
      document.removeEventListener('contextmenu', this.onDocumentClick)
    }
  }
  toggleShow = (showPopup) => {
    const { onToggle } = this.props
    onToggle && onToggle(showPopup) 
  }
  onClick = (e) => {

  }
  render() {
    const { showPopup } = this.state
    if (showPopup) {
      this.popupOnceShown = true
    }
    const { cls, showType, hideType, children, target, position, cache, async } = this.props
    const containerCls = classNames('callout',{
      'callout--show-popup': showPopup,
      [cls]: cls !== undefined
    })
    let popupCls = 'callout-popup'
    if(position !== undefined) {
      const arr = position.split(' ')
      const relativePos = arr[0]
      const alignPos = arr[1]
      if(relativePos) {
        popupCls += ` callout-popup--relative-${relativePos}`
      } if (alignPos) {
        popupCls += ` callout-popup--align-${alignPos}`
      }
      if (cache && !showPopup) {
        popupCls += ' hidden'
      }
      
    }
  }
}