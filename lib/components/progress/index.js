Object.defineProperty(exports, "__esModule", {
  value: true
});

var _progressSpace = require('./progress-space');

var _progressSpace2 = _interopRequireDefault(_progressSpace);

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_progress2.default.Space = _progressSpace2.default;

exports.default = _progress2.default;