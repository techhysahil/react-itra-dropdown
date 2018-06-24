
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './itraDropdown.scss'

class ItraDropdown extends PureComponent {
    constructor(props) { 
        super(props);
        this.state = {
          showDropdown : false,
          dataSource : this.props.dataSource,
          liveList : this.props.dataSource,
          selectedValue : this.props.selectedValue,
          textInputValue : "",
          showSearchBar : this.props.showSearchBar,
          disableAction : this.props.disable ? this.props.disable : false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataSource : nextProps.dataSource,
            liveList : nextProps.dataSource,
            selectedValue : nextProps.selectedValue,
            showSearchBar : nextProps.showSearchBar,
            disableAction : nextPropss.disable ? nextProps.disable : false,
        })
    }

    searchUpdated(event){
      let searchStr = event.target.value && event.target.value.toLowerCase();
      var queryResult = [];

      this.props.dataSource.forEach((item) => {
        if(item.list && item.list.length > 0){
            let subList = item.list.filter(subitem => {
                return subitem.name && subitem.name.toLowerCase().indexOf(searchStr) > -1
            })
            if(subList.length > 0){
                queryResult.push({
                    name : item.name,
                    list : subList
                });
            }
        }else{
            if(item.name && item.name.toLowerCase().indexOf(searchStr) > -1){
                queryResult.push(item);
            }
        }
      })

      this.setState({
        liveList : queryResult,
        textInputValue : event.target.value
      });
    }

    toggleDropdown(){
        if(this.state.showDropdown){
            this.setState({showDropdown: false});
        }else{
            this.setState(
                {showDropdown: true}, () => {
                    this.searchInput.focus()
                }
            );
        }
    }

    closeDropdown(){
        this.setState({showDropdown: false});
        this.state.textInputValue = "";
        this.setState({dataSource : this.props.dataSource.slice(0)});
    }

    itemSelected(e,index){
        e.stopPropagation();
        this.setState(
            {
                showDropdown: false,
                selectedValue : this.state.dataSource[index]
            }
        );
       this.props.onTagSelection(this.state.dataSource[index], e);
    }

    componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }

    // handleKeyPress(event){
    //   if(this.state.showDropdown){
    //     let liveListCopy = JSON.parse(JSON.stringify(this.state.liveList));

    //     // Enter key
    //     if (event.keyCode == 13) {
          
    //     }
    //     // Key Up
    //     if (event.keyCode == 40 && this.state.cursor !== null) {
          
    //     }
    //     // Key down
    //     if (event.keyCode == 38) {
    //         let cursor;
    //         // Initiate Keyboard cycling
    //         if(this.state.cursor === null){
    //             if(liveListCopy[0] && liveListCopy[0].list && liveListCopy[0].list.length > 0){
    //                 liveListCopy[0].list[0].active = true;
    //             }else{
    //                 liveListCopy[0].active = true;
    //             }
    //         }else{
    //             liveListCopy.
    //         }


    //     }
    //   }
    // }

    handleDocumentClick(evt) {
        if(this.state.showDropdown){
            const temp = this.refs.root;
            if (!temp.contains(evt.target)) {
                this.closeDropdown();
            }
        }
    }

    renderDropdown(item,index){
        return this.state.liveList.map((item, index) => {
            {
                return (item.list && item.list.length > 0) ? (
                    <div className="list">
                        <div className="list-item list-label">{item.name}</div>
                        {item.list.map( (subitem, index) => {
                            return(
                                <div className="list-item sublist" key={index} onClick={(e) => this.itemSelected(e,index)}>
                                    {subitem.name}
                                </div>
                            )
                        })}
                    </div>
                ):(
                    <div className="list">
                        <div className="list-item" key={index} onClick={(e) => this.itemSelected(e,index)}>
                            {item.name}
                        </div>
                    </div>
                )
            }
        })
    }

    render() {
        
        return (
            <div className={"Itra-dropdown-wrapper" + (this.state.disableAction ? ' disable' : '')} id="Itra-dropdown-wrapper" ref="root">
                <div className="dropdown-title" onClick={this.toggleDropdown}>
                    {/*<i className="fa fa-lock" aria-hidden="true"></i>*/}
                    <span className="value">{this.state.selectedValue && this.state.selectedValue.name}</span>
                    <i className="down-arrow fa fa-angle-down" aria-hidden="true"></i>
                </div>
                <div className={"itra-dropdown " + (this.state.showDropdown ? 'open' : 'close')}> 
                    <div className={"input-wrapper" + (this.state.showSearchBar && this.state.showSearchBar ? '' : ' hide')}>
                        <input type="text"  placeholder="Search" value={this.state.textInputValue} onChange={(e) => this.searchUpdated(e)} ref={x => this.searchInput = x} />
                        <i className="search-icon icon icon_Icon_AnalyticsInterface-33"></i>
                    </div>
                    <div className="list-wrapper">
                        {
                            this.renderDropdown()
                        }
                    </div>
                </div>
            </div>
        );
    }
}



ItraDropdown.propTypes = {
  dataSource: PropTypes.array,
  showSearchBar: PropTypes.bool,
  disable: PropTypes.bool,
  selectedValue: PropTypes.object,
  onTagSelection: PropTypes.func 
}



export default ItraDropdown
