Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/offline-view/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYNativeApi = require('../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _utils = require('../../../utils');

var _bleOfflineView = require('./ble-offline-view');

var _bleOfflineView2 = _interopRequireDefault(_bleOfflineView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYEvent = _TYNativeApi2.default.event;
var TYMobile = _TYNativeApi2.default.mobile;
var TYDevice = _TYNativeApi2.default.device;

var convert = _utils.RatioUtils.convert;


var OFFLINE_API_SUPPORT = TYMobile.verSupported('2.91');

var Res = {
  offline: require('../../res/offline.png')
};

var OfflineView = function (_Component) {
  _inherits(OfflineView, _Component);

  function OfflineView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OfflineView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OfflineView.__proto__ || Object.getPrototypeOf(OfflineView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      bluetoothStatus: null
    }, _this.bluetoothChangeHandle = function (bluetoothStatus) {
      _this.setState({ bluetoothStatus: bluetoothStatus });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OfflineView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var bluetoothStatus;
      return regeneratorRuntime.async(function componentDidMount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!OFFLINE_API_SUPPORT) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(TYDevice.getBleManagerState());

            case 4:
              bluetoothStatus = _context.sent;

              this.setState({ bluetoothStatus: bluetoothStatus });

            case 6:
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

            case 10:
              TYEvent.on('bluetoothChange', this.bluetoothChangeHandle);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[0, 8]]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      TYEvent.off('bluetoothChange', this.bluetoothChangeHandle);
    }
  }, {
    key: 'renderBleView',
    value: function renderBleView() {
      var _props = this.props,
          deviceOnline = _props.deviceOnline,
          capability = _props.capability,
          isBleOfflineOverlay = _props.isBleOfflineOverlay;

      if (typeof this.state.bluetoothStatus !== 'boolean') {
        return null;
      }
      return _react2.default.createElement(_bleOfflineView2.default, {
        bluetoothValue: this.state.bluetoothStatus,
        deviceOnline: deviceOnline,
        capability: capability,
        isBleOfflineOverlay: isBleOfflineOverlay,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      });
    }
  }, {
    key: 'renderOldView',
    value: function renderOldView() {
      return _react2.default.createElement(
        _reactNative.View,
        { accessibilityLabel: 'OfflineView_Wifi', style: [styles.container, this.props.style], __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          }
        },
        _react2.default.createElement(_reactNative.Image, { style: styles.icon, source: Res.offline, __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }),
        _react2.default.createElement(
          _TYText2.default,
          { style: [styles.tip, this.props.textStyle], __source: {
              fileName: _jsxFileName,
              lineNumber: 86
            }
          },
          this.props.text
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          appOnline = _props2.appOnline,
          capability = _props2.capability;


      if (appOnline && OFFLINE_API_SUPPORT && _TYNativeApi2.default.Navigator && _TYNativeApi2.default.Navigator.push) {
        var isWifiDevice = capability === 1;
        var isBle = !!_utils.NumberUtils.getBitValue(capability, 10);
        var isBleMesh = !!_utils.NumberUtils.getBitValue(capability, 11);
        var isSigMesh = !!_utils.NumberUtils.getBitValue(capability, 15);
        var isBleDevice = isBle || isBleMesh || isSigMesh;
        if (isWifiDevice || !appOnline) {
          return this.renderOldView();
        } else if (isBleDevice) {
          return this.renderBleView();
        }
      }

      return this.renderOldView();
    }
  }]);

  return OfflineView;
}(_react.Component);

OfflineView.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  textStyle: _reactNative.ViewPropTypes.style,
  text: _propTypes2.default.string,

  appOnline: _propTypes2.default.bool,
  deviceOnline: _propTypes2.default.bool,
  capability: _propTypes2.default.number,
  isBleOfflineOverlay: _propTypes2.default.bool
};
OfflineView.defaultProps = {
  style: null,
  textStyle: null,
  text: null,

  appOnline: true,
  deviceOnline: true,
  capability: 1,
  isBleOfflineOverlay: true
};
exports.default = OfflineView;


var styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  icon: {
    resizeMode: 'stretch',
    width: convert(121),
    height: convert(81)
  },
  tip: {
    marginTop: convert(14),
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});