Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListModal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/list.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _list = require('../TYLists/list');

var _list2 = _interopRequireDefault(_list);

var _withSkeleton = require('./withSkeleton');

var _withSkeleton2 = _interopRequireDefault(_withSkeleton);

var _utils = require('../../utils');

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectedPath = 'M288.67 521.63l18.69-25.26a5.217 5.217 0 0 1 7.29-1.09c0.02 0.01 0.04 0.03 0.06 0.04l113.01 86.01a5.216 5.216 0 0 0 6.48-0.13l275.9-228.25a5.22 5.22 0 0 1 6.97 0.29l17.32 16.98a5.212 5.212 0 0 1 0.07 7.37l-0.08 0.08-299.65 292.84a5.221 5.221 0 0 1-7.37-0.08l-0.01-0.01-138.22-142.06a5.206 5.206 0 0 1-0.46-6.73z';
var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;


var itemHeight = 48;

var ListPopup = function (_React$Component) {
  _inherits(ListPopup, _React$Component);

  function ListPopup(props) {
    _classCallCheck(this, ListPopup);

    var _this = _possibleConstructorReturn(this, (ListPopup.__proto__ || Object.getPrototypeOf(ListPopup)).call(this, props));

    _initialiseProps.call(_this);

    var _this$calcSelected = _this.calcSelected(props),
        selected = _this$calcSelected.selected,
        selectedArr = _this$calcSelected.selectedArr;

    itemHeight = _reactNative.StyleSheet.flatten([props.listItemStyle]).height || 48;
    _this.state = {
      selected: selected,
      selectedArr: selectedArr
    };
    props._onDataChange(props.value);
    return _this;
  }

  _createClass(ListPopup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.selected === nextProps.value) return;

      var _calcSelected = this.calcSelected(nextProps),
          selected = _calcSelected.selected,
          selectedArr = _calcSelected.selectedArr;

      this.setState({ selected: selected, selectedArr: selectedArr });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          switchValue = _props.switchValue,
          maxItemNum = _props.maxItemNum,
          listWrapperStyle = _props.listWrapperStyle,
          dataSource = _props.dataSource,
          selectedIcon = _props.selectedIcon,
          type = _props.type,
          iconTintColor = _props.iconTintColor,
          contentCenter = _props.contentCenter,
          value = _props.value,
          listItemStyle = _props.listItemStyle,
          onSelect = _props.onSelect,
          _onDataChange = _props._onDataChange,
          FlatListProps = _objectWithoutProperties(_props, ['switchValue', 'maxItemNum', 'listWrapperStyle', 'dataSource', 'selectedIcon', 'type', 'iconTintColor', 'contentCenter', 'value', 'listItemStyle', 'onSelect', '_onDataChange']);

      var dataCount = dataSource.length > maxItemNum ? maxItemNum : dataSource.length;
      var totalHeight = itemHeight * dataCount;
      return _react2.default.createElement(
        _reactNative.View,
        {
          style: [listWrapperStyle, !switchValue && { opacity: 0.6 }, { height: totalHeight }],
          pointerEvents: !switchValue ? 'none' : 'auto',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          }
        },
        _react2.default.createElement(_styled.StyledFlatList, _extends({ data: dataSource, renderItem: this.renderItem }, FlatListProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 221
          }
        }))
      );
    }
  }]);

  return ListPopup;
}(_react2.default.Component);

ListPopup.propTypes = _extends({}, _reactNative.FlatList.propTypes, {
  switchValue: _propTypes2.default.bool.isRequired,
  listWrapperStyle: _reactNative.ViewPropTypes.style,
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    styles: _propTypes2.default.object,
    title: _propTypes2.default.string,
    Icon: _propTypes2.default.element,
    value: _propTypes2.default.any.isRequired
  })),

  maxItemNum: _propTypes2.default.number,
  selectedIcon: _propTypes2.default.element,
  type: _propTypes2.default.oneOf(['switch', 'radio']),
  iconTintColor: _propTypes2.default.string,
  contentCenter: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array]),
  listItemStyle: _reactNative.ViewPropTypes.style,

  onSelect: _propTypes2.default.func,
  _onDataChange: _propTypes2.default.func
});
ListPopup.defaultProps = {
  listWrapperStyle: null,
  dataSource: [],
  maxItemNum: 5,
  selectedIcon: null,
  type: 'radio',
  iconTintColor: '',
  contentCenter: null,
  value: -1,
  listItemStyle: null,
  onSelect: function onSelect() {},
  _onDataChange: function _onDataChange() {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.calcSelected = function (props) {
    var type = props.type,
        value = props.value;

    var isRadio = type === 'radio' && (typeof value === 'string' || typeof value === 'number');
    if (isRadio) return { selected: value, selectedArr: [] };
    var isSwitch = type === 'switch' && Object.prototype.toString.call(value) === '[object Array]';
    if (isSwitch) return { selected: -1, selectedArr: value };
    return { selected: -1, selectedArr: [] };
  };

  this.selectRow = function (value) {
    var _props2 = _this2.props,
        onSelect = _props2.onSelect,
        type = _props2.type,
        _onDataChange = _props2._onDataChange;

    if (type === 'switch') return;
    var selected = _this2.state.selected;

    var isUnselect = selected === value;
    if (isUnselect) return;
    _this2.setState({ selected: isUnselect ? -1 : value });
    onSelect && onSelect(value);
    _onDataChange && _onDataChange(value);
  };

  this.switchValueChange = function (sValue, value) {
    var _props3 = _this2.props,
        onSelect = _props3.onSelect,
        _onDataChange = _props3._onDataChange;
    var selectedArr = _this2.state.selectedArr;

    var alreadyIndex = selectedArr.indexOf(value);
    if (sValue) {
      if (alreadyIndex > -1) return;
      selectedArr.push(value);
    } else {
      if (alreadyIndex < 0) return;
      selectedArr.splice(alreadyIndex, 1);
    }
    _this2.setState({ selectedArr: selectedArr });
    onSelect && onSelect(value, sValue);
    _onDataChange && _onDataChange(selectedArr);
  };

  this.renderSwitch = function (value) {
    return _react2.default.createElement(_styled.StyledSwitch, {
      style: { right: 0 },
      useNativeDriver: false,
      onValueChange: function onValueChange(sValue) {
        return _this2.switchValueChange(sValue, value);
      },
      defaultValue: _this2.state.selectedArr.indexOf(value) > -1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112
      }
    });
  };

  this.renderSelectIcon = function (value) {
    var _props4 = _this2.props,
        selectedIcon = _props4.selectedIcon,
        iconTintColor = _props4.iconTintColor;

    if (_this2.state.selected === value) {
      return selectedIcon || _react2.default.createElement(_styled.StyledIconFont, { d: selectedPath, color: iconTintColor, __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      });
    }
    return null;
  };

  this.renderActions = function (value) {
    var type = _this2.props.type;

    if (type === 'switch') {
      return _this2.renderSwitch(value);
    }
    return _this2.renderSelectIcon(value);
  };

  this.renderItem = function (_ref) {
    var item = _ref.item,
        index = _ref.index;
    var _props5 = _this2.props,
        _props5$styles = _props5.styles,
        styles = _props5$styles === undefined ? {} : _props5$styles,
        type = _props5.type,
        contentCenter = _props5.contentCenter,
        listItemStyle = _props5.listItemStyle,
        dataSource = _props5.dataSource;

    var containerStyle = {
      alignSelf: 'stretch',
      height: itemHeight,
      backgroundColor: '#fff'
    };
    var titleAlign = void 0;
    if (contentCenter) {
      titleAlign = 'center';
    } else if (type === 'switch') {
      titleAlign = 'left';
    } else if (type === 'radio') {
      titleAlign = 'center';
    }

    return _react2.default.createElement(
      ThemeConsumer,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      },
      function (globalTheme) {
        var popupTheme = _extends({}, _this2.props, { theme: globalTheme });
        var cellFontColor = getTheme(popupTheme, 'popup.list.cellFontColor');
        var cellFontSize = getTheme(popupTheme, 'popup.cellFontSize');
        var tintColor = getTheme(popupTheme, 'popup.tintColor');
        var flatItemStyle = void 0;
        if (listItemStyle !== null && listItemStyle.backgroundColor) {
          flatItemStyle = listItemStyle;
        } else {
          flatItemStyle = _extends({}, listItemStyle, {
            backgroundColor: getTheme(popupTheme, 'popup.cellBg')
          });
        }
        var itemStyle = _extends({}, styles, {
          container: [_extends({}, containerStyle, flatItemStyle), styles.container],
          content: [{ flex: 1, alignItems: 'center' }, styles.content],
          title: [{ textAlign: titleAlign, fontSize: cellFontSize, color: cellFontColor }, styles.title],
          contentRight: [{ position: 'absolute', right: type === 'switch' ? 16 : 24 }, styles.contentRight]
        });
        return _react2.default.createElement(_list2.default.Item, _extends({
          key: 'list_' + index,
          activeOpacity: type === 'switch' ? 1 : 0.8,
          styles: itemStyle,
          tintColor: tintColor,
          Action: _this2.renderActions(dataSource[index].value),
          onPress: function onPress() {
            return _this2.selectRow(dataSource[index].value);
          }
        }, item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 183
          }
        }));
      }
    );
  };
};

var ListModal = exports.ListModal = (0, _withSkeleton2.default)(ListPopup, true);

exports.default = (0, _withSkeleton2.default)(ListPopup);