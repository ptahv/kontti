'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

var _createStoreSubscription = require('./container/createStoreSubscription.js');

var _createStoreSubscription2 = babelHelpers.interopRequireDefault(_createStoreSubscription);

var _getListenerChildContext = require('./container/getListenerChildContext.js');

var _getListenerChildContext2 = babelHelpers.interopRequireDefault(_getListenerChildContext);

var _getDistributorChildContext = require('./container/getDistributorChildContext.js');

var _getDistributorChildContext2 = babelHelpers.interopRequireDefault(_getDistributorChildContext);

var _getContainerContext2 = require('./container/getContainerContext.js');

var _getContainerContext3 = babelHelpers.interopRequireDefault(_getContainerContext2);

var _utils = require('./utils.js');

exports.default = function (_ref) {
    var konttiType = _ref.konttiType,
        isPure = _ref.isPure,
        createStore = _ref.createStore,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        _ref$propTypes = _ref.propTypes,
        propTypes = _ref$propTypes === undefined ? {} : _ref$propTypes,
        _ref$subscribedKeys = _ref.subscribedKeys,
        subscribedKeys = _ref$subscribedKeys === undefined ? [] : _ref$subscribedKeys,
        ViewComponent = _ref.ViewComponent;
    var componentContextTypes = options.contextTypes;


    var isSubscriber = !_fp2.default.isEmpty(subscribedKeys);
    var isDistributor = !_fp2.default.isNil(createStore);

    var ContainerComponent = function (_React$Component) {
        babelHelpers.inherits(ContainerComponent, _React$Component);

        function ContainerComponent() {
            babelHelpers.classCallCheck(this, ContainerComponent);
            return babelHelpers.possibleConstructorReturn(this, (ContainerComponent.__proto__ || Object.getPrototypeOf(ContainerComponent)).apply(this, arguments));
        }

        babelHelpers.createClass(ContainerComponent, [{
            key: 'componentWillMount',

            /* Statics: 
                _storeChanging,
                _storeChanged,
                _propsChanged,
            */

            value: function componentWillMount() {
                if (isDistributor) this._store = createStore();else this._store = this.context._store;

                if (isSubscriber) this._storeSubscription = (0, _createStoreSubscription2.default)(this, subscribedKeys);

                ViewComponent.propTypes = babelHelpers.extends({}, ContainerComponent.propTypes, ViewComponent.propTypes, propTypes);
                ContainerComponent.propTypes = {};

                /* ContextTypes */
                ViewComponent.contextTypes = _fp2.default.omit('_store', babelHelpers.extends({}, ViewComponent.contextTypes, componentContextTypes, ContainerComponent.contextTypes, ContainerComponent.childContextTypes));
            }
        }, {
            key: 'getChildContext',
            value: function getChildContext() {
                return babelHelpers.extends({}, isSubscriber && (0, _getListenerChildContext2.default)(this), isDistributor && (0, _getDistributorChildContext2.default)(this, konttiType));
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps() {
                if (isSubscriber) this._propsChanged = true;
            }
        }, {
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                var _store;

                this._storeChanging = false;

                var props = this.props,
                    _storeState = this._storeState,
                    _storeChanged = this._storeChanged;


                var nextStoreState = (_store = this._store).get.apply(_store, babelHelpers.toConsumableArray(subscribedKeys));

                if (isPure && (!_storeChanged || (0, _utils.shallowEquals)(_storeState, nextStoreState))) return false;else if ((0, _utils.shallowEquals)(props, nextProps) && (0, _utils.shallowEquals)(_storeState, nextStoreState)) return false;

                this._storeState = nextStoreState;
                return true;
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                if (!this._storeChanging) this._storeChanged = false;

                this._propsChanged = false;
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._isUnmounted = true;

                if (isDistributor) this._storeSubscription();
            }
        }, {
            key: 'render',
            value: function render() {
                var _store2,
                    _this2 = this;

                var _props = this.props,
                    children = _props.children,
                    restOfProps = babelHelpers.objectWithoutProperties(_props, ['children']);


                var props = !isSubscriber ? restOfProps : babelHelpers.extends({}, restOfProps, (_store2 = this._store).get.apply(_store2, babelHelpers.toConsumableArray(subscribedKeys)));

                return _react2.default.createElement(
                    ViewComponent,
                    babelHelpers.extends({
                        ref: function ref(cmp) {
                            _this2.ViewComponent = cmp;
                        }
                    }, props),
                    children
                );
            }
        }]);
        return ContainerComponent;
    }(_react2.default.Component);

    /* Setup Container contextTypes */


    var _getContainerContext = (0, _getContainerContext3.default)(konttiType, isSubscriber),
        _getContainerContext$ = _getContainerContext.containerContextTypes,
        containerContextTypes = _getContainerContext$ === undefined ? {} : _getContainerContext$,
        _getContainerContext$2 = _getContainerContext.containerChildContextTypes,
        containerChildContextTypes = _getContainerContext$2 === undefined ? {} : _getContainerContext$2;

    ContainerComponent.contextTypes = containerContextTypes;
    ContainerComponent.childContextTypes = containerChildContextTypes;

    return ContainerComponent;
};