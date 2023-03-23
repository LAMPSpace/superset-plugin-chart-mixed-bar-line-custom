"use strict";

exports.__esModule = true;
exports.default = transformProps;

var _core = require("@superset-ui/core");

var _d = require("d3");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function transformProps(chartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your SupersetPluginChartMixedBarLineCustom.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  var {
    width,
    height,
    formData,
    queriesData,
    theme
  } = chartProps;
  var {
    xAxisTitle,
    xAxisTitleBottomMargin,
    colorScheme,
    showLegend,
    xAxisTimeFormat,
    lineChartColumns,
    legendPosition,
    showTitle,
    xAxisTitleColor,
    xAxisTitleFontSize,
    xAxisTitleFontWeight,
    showXTickLine,
    xAxisTickSize,
    lineChartStrokeWidth,
    hideYAxis,
    barChartYAxisPosition,
    lineChartYAxisPosition,
    lineChartShowValue,
    barChartShowValue
  } = formData;
  var data = queriesData[0].data;

  var colorScale = _core.CategoricalColorNamespace.getScale(colorScheme);

  return {
    width,
    height,
    data: data.map(item => _extends({}, item, {
      // convert epoch to native Date
      __timestamp: (0, _d.timeFormat)(xAxisTimeFormat)( // eslint-disable-next-line no-underscore-dangle
      new Date(item.__timestamp))
    })),
    // and now your control data, manipulated as needed, and passed through as props!
    xAxisTitle,
    xAxisTitleBottomMargin,
    colorScheme,
    showLegend,
    xAxisTimeFormat,
    lineChartColumns,
    theme,
    colorScale,
    legendPosition,
    showTitle,
    xAxisTitleColor,
    xAxisTitleFontSize,
    xAxisTitleFontWeight,
    showXTickLine,
    xAxisTickSize,
    lineChartStrokeWidth,
    hideYAxis,
    barChartYAxisPosition,
    lineChartYAxisPosition,
    lineChartShowValue,
    barChartShowValue
  };
}