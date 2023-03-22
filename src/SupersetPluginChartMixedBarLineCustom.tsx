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
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  LabelList,
} from 'recharts';
import {
  SupersetPluginChartMixedBarLineCustomProps,
  SupersetPluginChartMixedBarLineCustomStylesProps,
} from './types';
import { rgb } from 'd3';
// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginChartMixedBarLineCustomStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginChartMixedBarLineCustom(
  props: SupersetPluginChartMixedBarLineCustomProps,
) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
  });

  console.log('Plugin props', props);

  const keys = Object.keys(data[0]);

  const xKey = keys[0];

  const lineKeys = props.lineChartColumns || [];

  const barKeys = keys.filter(key => key !== xKey && !lineKeys.includes(key));

  const colors = getCategoricalSchemeRegistry().get(props.colorScheme)?.colors;

  const numberFormatter = (num: any) => {
    const lookup = [
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    let result = num.toFixed(2);
    lookup.forEach((item, index) => {
      if (index !== 0) {
        const preLookup = lookup[index - 1];
        if (item.value >= Math.abs(num) && Math.abs(num) > preLookup.value) {
          result = (num / preLookup.value).toFixed(2) + preLookup.symbol;
        }
      }
    });
    return result;
  };

  return (
    <ComposedChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
      <XAxis
        label={
          props.showTitle && {
            value: props.xAxisTitle,
            position: 'bottom',
            offset: 0,
            fill: rgb(
              props.xAxisTitleColor?.r,
              props.xAxisTitleColor?.g,
              props.xAxisTitleColor?.b,
            ).toString(),
            fontWeight: props.xAxisTitleFontWeight || 'normal',
            fontSize: props.xAxisTitleFontSize || 12,
          }
        }
        type="category"
        dataKey={xKey}
        height={parseInt(props.xAxisTitleBottomMargin, 10) || 30}
        tickLine={props.showXTickLine}
        tickSize={props.xAxisTickSize || 6}
      />
      <Tooltip labelFormatter={label => `${props.xAxisTitle}: ${label}`} />
      {props.showLegend && (
        <Legend
          verticalAlign={props.legendPosition === 'top' ? 'top' : 'bottom'}
          wrapperStyle={{ lineHeight: '60px' }}
        />
      )}
      {barKeys.map((key, index) => (
        <>
          <YAxis
            dataKey={key}
            yAxisId={index}
            type="number"
            stroke={colors?.[index]}
            tickFormatter={numberFormatter}
            hide={props.hideYAxis?.includes(key) || false}
            orientation={
              props.barChartYAxisPosition === 'right' ? 'right' : 'left'
            }
          />
          <Bar dataKey={key} fill={colors?.[index]}>
            <LabelList
              dataKey={key}
              position="top"
              formatter={numberFormatter}
              style={{
                // eslint-disable-next-line theme-colors/no-literal-colors
                color: '#000',
                fontSize: 12,
                textShadow:
                  '-1px 0px 0px white, 1px 0px 0px white, 0px -1px 0px white, 0px 1px 0px white',
              }}
            />
          </Bar>
        </>
      ))}
      {lineKeys.map((key, index) => {
        const yAxisId = barKeys.length + index;
        return (
          <>
            <YAxis
              dataKey={key}
              yAxisId={yAxisId}
              type="number"
              orientation={
                props.lineChartYAxisPosition === 'right' ? 'right' : 'left'
              }
              stroke={colors?.[yAxisId]}
              tickFormatter={numberFormatter}
              hide={props.hideYAxis?.includes(key) || false}
            />
            <Line
              dataKey={key}
              yAxisId={yAxisId}
              type="monotone"
              stroke={colors?.[yAxisId]}
              strokeWidth={props.lineChartStrokeWidth || 4}
              // eslint-disable-next-line theme-colors/no-literal-colors
              dot={{
                fill: '#ffffff',
                stroke: colors?.[yAxisId],
                strokeWidth: 2,
                r: 6,
              }}
            >
              <LabelList
                dataKey={key}
                position="top"
                formatter={numberFormatter}
                style={{
                  // eslint-disable-next-line theme-colors/no-literal-colors
                  color: '#000',
                  fontSize: 12,
                  textShadow:
                    '-1px 0px 0px white, 1px 0px 0px white, 0px -1px 0px white, 0px 1px 0px white',
                }}
              />
            </Line>
          </>
        );
      })}
    </ComposedChart>
  );
}
