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
import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sections,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (tranlated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an intger or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyTimeseriesTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Chart Title'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'show_title',
            config: {
              type: 'CheckboxControl',
              label: t('Show'),
              renderTrigger: true,
              default: false,
              description: t('Whether to display the chart title'),
            },
          },
        ],
        [
          {
            name: 'x_axis_title',
            config: {
              type: 'TextControl',
              label: t('X Axis title'),
              renderTrigger: true,
              default: 'X Axis title',
              description: t('X Axis title'),
              visibility: ({ controls }) => controls.show_title.value,
            },
          },
        ],
        [
          {
            name: 'x_axis_title_bottom_margin',
            config: {
              type: 'TextControl',
              label: t('X Axis title bottom margin'),
              renderTrigger: true,
              default: '30',
              description: t('X Axis title bottom margin'),
              visibility: ({ controls }) => controls.show_title.value,
            },
          },
        ],
        [
          {
            name: 'x_axis_title_color',
            config: {
              type: 'ColorPickerControl',
              label: t('X Axis title color'),
              renderTrigger: true,
              default: '',
              description: t('X Axis title color'),
              visibility: ({ controls }) => controls.show_title.value,
            },
          },
        ],
        [
          {
            name: 'x_axis_title_font_size',
            config: {
              type: 'TextControl',
              label: t('X Axis title font size'),
              renderTrigger: true,
              default: '',
              description: t('X Axis title font size'),
              visibility: ({ controls }) => controls.show_title.value,
            },
          },
          {
            name: 'x_axis_title_font_weight',
            config: {
              type: 'SelectControl',
              label: t('X Axis title font weight'),
              renderTrigger: true,
              default: 'bold',
              choices: [
                ['bold', 'Bold'],
                ['normal', 'Normal'],
              ],
              description: t('X Axis title font weight'),
              visibility: ({ controls }) => controls.show_title.value,
            },
          }
        ],
        [
          {
            name: 'show_x_tick_line',
            config: {
              type: 'CheckboxControl',
              label: t('Show X Tick Line'),
              renderTrigger: true,
              default: true,
              description: t('Show X Tick Line'),
            },
          },
        ],
        [
          {
            name: 'x_axis_tick_size',
            config: {
              type: 'TextControl',
              label: t('X Axis tick size'),
              renderTrigger: true,
              default: '6',
              description: t('X Axis tick size'),
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        [
          {
            name: 'show_legend',
            config: {
              type: 'CheckboxControl',
              label: t('Legend'),
              renderTrigger: true,
              default: true,
              description: t('Whether to display the legend (toggles)'),
            },
          },
        ],
        [
          {
            name: 'legend_position',
            config: {
              type: 'SelectControl',
              label: t('Legend Position'),
              renderTrigger: true,
              default: 'bottom',
              choices: [
                ['top', 'Top'],
                ['bottom', 'Bottom'],
              ],
              description: t('Legend position'),
              visibility: ({ controls }) => controls.show_legend.value,
            },
          },
        ],
        ['x_axis_time_format'],
      ],
    },
    {
      label: t('Bar Chart'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'bar_char_y_axis_position',
            config: {
              type: 'SelectControl',
              label: t('Y Axis Position'),
              renderTrigger: true,
              default: 'left',
              choices: [
                ['left', 'Left'],
                ['right', 'Right'],
              ],
              description: t('Y Axis Position'),
            },
          },
        ],
        [
          {
            name: 'bar_chart_show_value',
            config: {
              type: 'CheckboxControl',
              label: t('Show Value'),
              renderTrigger: true,
              default: false,
              description: t('Show Value'),
            },
          },
        ],
      ],
    },
    {
      label: t('Line Chart'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'line_chart_columns',
            config: {
              type: 'SelectControl',
              multi: true,
              label: t('Line Chart Columns'),
              renderTrigger: true,
              description: t('Line Chart Columns'),
              // get list of metrics from datasource of chart
              mapStateToProps: chart => {
                const metrics = chart.form_data.metrics || [];
                return {
                  choices: metrics.map(m => [m, m]),
                };
              },
            },
          },
        ],
        [
          {
            name: 'line_chart_stroke_width',
            config: {
              type: 'TextControl',
              label: t('Line Chart Stroke Width'),
              renderTrigger: true,
              default: '4',
              description: t('Line Chart Stroke Width'),
            },
          },
        ],
        [
          {
            name: 'line_chart_y_axis_position',
            config: {
              type: 'SelectControl',
              label: t('Line Chart Y Axis Position'),
              renderTrigger: true,
              default: 'left',
              choices: [
                ['left', 'Left'],
                ['right', 'Right'],
              ],
              description: t('Line Chart Y Axis Position'),
            },
          },
        ],
        [
          {
            name: 'line_chart_show_value',
            config: {
              type: 'CheckboxControl',
              label: t('Line Chart Show Value'),
              renderTrigger: true,
              default: false,
              description: t('Line Chart Show Value'),
            },
          },
        ],
      ],
    },
    {
      label: t('Y Axis options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'hide_y_axis',
            config: {
              type: 'SelectControl',
              label: t('Hide Y Axis'),
              renderTrigger: true,
              multi: true,
              default: [],
              mapStateToProps: chart => {
                const metrics = chart.form_data.metrics || [];
                return {
                  choices: metrics.map(m => [m, m]),
                };
              },
              description: t('Hide Y Axis'),
            },
          },
        ],
      ],
    }
  ],
};

export default config;
