'use strict';

var React = require('react/addons');

require('styles/Modal.less');

var Modal = React.createClass({
    displayName: 'Modal',

    getInitialState: function () {
        return {
            visible: false
        };
    },
    /**
     * Defaults
     * @returns {{onShow: Function, onHide: Function, closable: boolean}}
     */
    getDefaultProps: function () {
        return {
            onShow: function () {
            },
            onHide: function () {
            },
            closable: true
        };
    },

    componentWillMount: function () {
        this.handleBeforeComponentUpdate(this.props);
    },

    componentWillUnmount: function () {
        this.__setBodyOverflowVisible(true);
    },

    componentWillReceiveProps: function (props) {
        this.handleBeforeComponentUpdate(props);
    },

    componentDidMount: function () {
        this.handleComponentUpdate(this.props, this.getInitialState());
    },

    componentDidUpdate: function (prevProps, prevState) {
        this.handleComponentUpdate(prevProps, prevState);
    },

    handleBeforeComponentUpdate: function (props) {
        if (props.hasOwnProperty('visible') && props.visible !== this.state.visible) {
            this.setState({
                visible: props.visible
            });
        }
    },

    handleComponentUpdate: function (prevProps, prevState) {
        if (prevState.visible !== this.state.visible) {
            if (this.state.visible) {
                this.props.onShow();
            } else {
                this.props.onHide();
            }
            this.__setBodyOverflowVisible(!this.state.visible);
        }
    },

    /**
     * Set body overflow
     * @param visible
     * @private
     */
    __setBodyOverflowVisible: function (visible) {
        if (!visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    },

    /**
     * Close button handler
     * @param event
     */
    handleCloseBtnClick: function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.toggleVisibility();
    },

    /**
     * Close modal on overlay get clicked
     * @param event
     */
    handleOverlayClick: function (event) {
        if (event.target === this.refs.overlay.getDOMNode() && this.props.closable) {
            event.preventDefault();
            event.stopPropagation();
            this.toggleVisibility();
        }
    },

    /**
     * Toggle modal component visibility
     */
    toggleVisibility: function () {
        var visible = !this.state.visible;
        this.setState({
            visible: visible
        });
    },

    /**
     * Show modal component
     */
    show: function () {
        this.setState({visible: true});
    },

    /**
     * Hide modal component
     */
    hide: function () {
        this.setState({visible: false});
    },

    render: function () {
        var closeButton = React.createElement('div', {className: 'overlay-top'}, React.createElement('div', {
            className: 'overlay-close',
            title: 'Закрыть',
            onClick: this.handleCloseBtnClick
        }, 'x'));

        if (this.props.closable === false) {
            closeButton = React.createElement('div');
        }

        return (
            React.createElement('div', {
                    className: 'overlay' + (this.state.visible ? '' : ' hidden') + (this.props.className ? ' ' + this.props.className : ''),
                    ref: 'overlay',
                    onClick: this.handleOverlayClick
                }, closeButton,

                React.createElement('div', {className: 'overlay-content'}, this.props.children)
            )
        );
    }
});

module.exports = Modal;

