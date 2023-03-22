var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled, getCategoricalSchemeRegistry } from '@superset-ui/core';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, LabelList } from 'recharts';
import { rgb } from 'd3'; // The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

var Styles = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  height: ", "px;\n  width: ", "px;\n"])), _ref => {
  var {
    height
  } = _ref;
  return height;
}, _ref2 => {
  var {
    width
  } = _ref2;
  return width;
});
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginChartMixedBarLineCustom(props) {
  var _getCategoricalScheme, _props$xAxisTitleColo, _props$xAxisTitleColo2, _props$xAxisTitleColo3;

  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width
  } = props;
  var rootElem = /*#__PURE__*/createRef(); // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.

  useEffect(() => {
    var root = rootElem.current;
  });
  console.log('Plugin props', props);
  var keys = Object.keys(data[0]);
  var xKey = keys[0];
  var lineKeys = props.lineChartColumns || [];
  var barKeys = keys.filter(key => key !== xKey && !lineKeys.includes(key));
  var colors = (_getCategoricalScheme = getCategoricalSchemeRegistry().get(props.colorScheme)) == null ? void 0 : _getCategoricalScheme.colors;

  var numberFormatter = num => {
    var lookup = [{
      value: 1e3,
      symbol: 'k'
    }, {
      value: 1e6,
      symbol: 'M'
    }, {
      value: 1e9,
      symbol: 'B'
    }, {
      value: 1e12,
      symbol: 'T'
    }, {
      value: 1e15,
      symbol: 'P'
    }, {
      value: 1e18,
      symbol: 'E'
    }];
    var result = num.toFixed(2);
    lookup.forEach((item, index) => {
      if (index !== 0) {
        var preLookup = lookup[index - 1];

        if (item.value >= Math.abs(num) && Math.abs(num) > preLookup.value) {
          result = (num / preLookup.value).toFixed(2) + preLookup.symbol;
        }
      }
    });
    return result;
  };

  return /*#__PURE__*/React.createElement(ComposedChart, {
    width: width,
    height: height,
    data: data
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#f5f5f5"
  }), /*#__PURE__*/React.createElement(XAxis, {
    label: props.showTitle && {
      value: props.xAxisTitle,
      position: 'bottom',
      offset: 0,
      fill: rgb((_props$xAxisTitleColo = props.xAxisTitleColor) == null ? void 0 : _props$xAxisTitleColo.r, (_props$xAxisTitleColo2 = props.xAxisTitleColor) == null ? void 0 : _props$xAxisTitleColo2.g, (_props$xAxisTitleColo3 = props.xAxisTitleColor) == null ? void 0 : _props$xAxisTitleColo3.b).toString(),
      fontWeight: props.xAxisTitleFontWeight || 'normal',
      fontSize: props.xAxisTitleFontSize || 12
    },
    type: "category",
    dataKey: xKey,
    height: parseInt(props.xAxisTitleBottomMargin, 10) || 30,
    tickLine: props.showXTickLine,
    tickSize: props.xAxisTickSize || 6
  }), /*#__PURE__*/React.createElement(Tooltip, {
    labelFormatter: label => props.xAxisTitle + ": " + label
  }), props.showLegend && /*#__PURE__*/React.createElement(Legend, {
    verticalAlign: props.legendPosition === 'top' ? 'top' : 'bottom',
    wrapperStyle: {
      lineHeight: '60px'
    }
  }), barKeys.map((key, index) => {
    var _props$hideYAxis;

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(YAxis, {
      dataKey: key,
      yAxisId: index,
      type: "number",
      stroke: colors == null ? void 0 : colors[index],
      tickFormatter: numberFormatter,
      hide: ((_props$hideYAxis = props.hideYAxis) == null ? void 0 : _props$hideYAxis.includes(key)) || false,
      orientation: props.barChartYAxisPosition === 'right' ? 'right' : 'left'
    }), /*#__PURE__*/React.createElement(Bar, {
      dataKey: key,
      fill: colors == null ? void 0 : colors[index]
    }, /*#__PURE__*/React.createElement(LabelList, {
      dataKey: key,
      position: "top",
      formatter: numberFormatter,
      style: {
        // eslint-disable-next-line theme-colors/no-literal-colors
        color: '#000',
        fontSize: 12,
        textShadow: '-1px 0px 0px white, 1px 0px 0px white, 0px -1px 0px white, 0px 1px 0px white'
      }
    })));
  }), lineKeys.map((key, index) => {
    var _props$hideYAxis2;

    var yAxisId = barKeys.length + index;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(YAxis, {
      dataKey: key,
      yAxisId: yAxisId,
      type: "number",
      orientation: props.lineChartYAxisPosition === 'right' ? 'right' : 'left',
      stroke: colors == null ? void 0 : colors[yAxisId],
      tickFormatter: numberFormatter,
      hide: ((_props$hideYAxis2 = props.hideYAxis) == null ? void 0 : _props$hideYAxis2.includes(key)) || false
    }), /*#__PURE__*/React.createElement(Line, {
      dataKey: key,
      yAxisId: yAxisId,
      type: "monotone",
      stroke: colors == null ? void 0 : colors[yAxisId],
      strokeWidth: props.lineChartStrokeWidth || 4 // eslint-disable-next-line theme-colors/no-literal-colors
      ,
      dot: {
        fill: '#ffffff',
        stroke: colors == null ? void 0 : colors[yAxisId],
        strokeWidth: 2,
        r: 6
      }
    }, /*#__PURE__*/React.createElement(LabelList, {
      dataKey: key,
      position: "top",
      formatter: numberFormatter,
      style: {
        // eslint-disable-next-line theme-colors/no-literal-colors
        color: '#000',
        fontSize: 12,
        textShadow: '-1px 0px 0px white, 1px 0px 0px white, 0px -1px 0px white, 0px 1px 0px white'
      }
    })));
  }));
}