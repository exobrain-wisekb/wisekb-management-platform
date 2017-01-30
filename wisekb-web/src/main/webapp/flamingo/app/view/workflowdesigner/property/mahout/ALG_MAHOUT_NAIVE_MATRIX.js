/*
 * Copyright 2012-2016 the Flamingo Community.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ext.ns('Flamingo.view.workflowdesigner.property.mahout');
Ext.define('Flamingo.view.workflowdesigner.property.mahout.ALG_MAHOUT_NAIVE_MATRIX', {
    extend: 'Flamingo.view.workflowdesigner.property._NODE_ALG',
    alias: 'widget.ALG_MAHOUT_NAIVE_MATRIX',

    requires: [
        'Flamingo.view.workflowdesigner.property._ConfigurationBrowserField',
        'Flamingo.view.workflowdesigner.property._BrowserField',
        'Flamingo.view.workflowdesigner.property._ColumnGrid',
        'Flamingo.view.workflowdesigner.property._DependencyGrid',
        'Flamingo.view.workflowdesigner.property._NameValueGrid',
        'Flamingo.view.workflowdesigner.property._KeyValueGrid',
        'Flamingo.view.workflowdesigner.property._EnvironmentGrid'
    ],

    width: 450,
    height: 320,

    items: [
        {
            title: 'Parameter',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 150
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: '_browserField',
                    name: 'vectorFile',
                    fieldLabel: 'Vector Path',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'outputFile',
                    fieldLabel: 'Working Path',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'distanceMeasure',
                    fieldLabel: 'A Distance Measuring Instance Class Name',
                    tooltip: '',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'thresholdT1',
                    fieldLabel: 'T1 Threshold Distance (clustering)',
                    tooltip: '',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'thresholdT2',
                    fieldLabel: 'T2 Threshold Distance (clustering)',
                    tooltip: '',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'reducerT1',
                    fieldLabel: 'T1 Threshold Distance (Reducer)',
                    tooltip: '',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'reducerT2',
                    fieldLabel: 'T2 Threshold Distance (Reducer)',
                    tooltip: '',
                    vtype: 'numeric',
                    value: 2,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'clusterFilterSize',
                    fieldLabel: 'Minimum Cluster Filter Size',
                    tooltip: '',
                    vtype: 'numeric',
                    value: 0,
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'overwrite',
                    fieldLabel: 'Change Directory Path',
                    allowBlank: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Vector Clustering Existence',
                    columns: 2,
                    itemId: 'runCluster',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'runClustering',
                            checked: true,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'runClustering',
                            checked: false,
                            inputValue: 'false'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Mem use',
                    columns: 2,
                    itemId: 'runSequential',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'runSequential',
                            checked: true,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'runSequential',
                            checked: false,
                            inputValue: 'false'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Exec type',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            name: 'algorithmOption',
                            value: 'sequential',
                            flex: 1,
                            forceSelection: true,
                            multiSelect: false,
                            disabled: false,
                            editable: false,
                            displayField: 'name',
                            valueField: 'value',
                            mode: 'local',
                            queryMode: 'local',
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: 'SEQUENTIAL', value: 'sequential', description: 'SEQUENTIAL'},
                                    {name: 'MAPREDUCE', value: 'mapreduce', description: 'MAPREDUCE'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Delimiter',
                    tooltip: 'Column Delimiter',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'delimiter',
                                    value: '\'\\t\'',
                                    flex: 1,
                                    forceSelection: true,
                                    multiSelect: false,
                                    editable: false,
                                    readOnly: this.readOnly,
                                    displayField: 'name',
                                    valueField: 'value',
                                    mode: 'local',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['name', 'value', 'description'],
                                        data: [
                                            {
                                                name: 'Double Colon',
                                                value: '::',
                                                description: '::'
                                            },
                                            {
                                                name: 'Comma',
                                                value: ',',
                                                description: ','
                                            },
                                            {
                                                name: 'Pipe',
                                                value: '|',
                                                description: '|'
                                            },
                                            {
                                                name: 'Tab',
                                                value: '\'\\t\'',
                                                description: '\'\\t\''
                                            },
                                            {
                                                name: 'Blank',
                                                value: '\'\\s\'',
                                                description: '\'\\s\''
                                            },
                                            {
                                                name: 'User Defined',
                                                value: 'CUSTOM',
                                                description: 'User Defined'
                                            }
                                        ]
                                    }),
                                    listeners: {
                                        change: function (combo, newValue, oldValue, eOpts) {
                                            // 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                                            var customValueField = combo.nextSibling('textfield');
                                            if (newValue === 'CUSTOM') {
                                                customValueField.enable();
                                                customValueField.isValid();
                                            } else {
                                                customValueField.disable();
                                                if (newValue) {
                                                    customValueField.setValue(newValue);
                                                } else {
                                                    customValueField.setValue('::');
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'delimiterValue',
                                    vtype: 'exceptcommaspace',
                                    flex: 1,
                                    disabled: true,
                                    readOnly: this.readOnly,
                                    allowBlank: false,
                                    value: '\\t'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'MapReduce',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'jar',
                    fieldLabel: 'Mahout JAR',
                    value: 'org.apache.mahout:mahout-core:0.5',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: 'Driver',
                    value: 'CanopyClustering',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: '_dependencyGrid',
                    title: 'Dependency JAR',
                    flex: 1
                }
            ]
        },
        {
            title: 'Input column',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: '_prevColumnGrid',
                    readOnly: true,
                    flex: 1
                }
            ]
        },
        {
            title: 'Output column',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'outputPathQualifier'
                },
                /*{
                 xtype : '_delimiterSelCmbField',
                 hidden: true
                 },*/
                {
                    xtype: '_columnGrid',
                    readOnly: true,
                    flex: 1
                }
            ]
        },
        {
            title: 'Hadoop Configuration',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: 'Enter a key and a value of Configuration.set () method used in Hadoop Mapreduce.'
                },
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        },
        {
            title: 'References',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: '<a href="https://mahout.apache.org/users/classification/bayesian.html" target="_blank">Naive Bayes</a>'
                },
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: '<a href="http://www.slideshare.net/bigdatasyd/machine-learning-withmahout" target="_blank">Machine Learning with Mahout</a>'
                }
            ]
        }
    ],

    /**
     * UI 컴포넌트의 Key를 필터링한다.
     *
     * ex) 다음과 같이 필터를 설정할 수 있다.
     * propFilters: {
     *     // 추가할 프라퍼티
     *     add   : [
     *         {'test1': '1'},
     *         {'test2': '2'}
     *     ],
     *
     *     // 변경할 프라퍼티
     *     modify: [
     *         {'delimiterType': 'delimiterType2'},
     *         {'config': 'config2'}
     *     ],
     *
     *     // 삭제할 프라퍼티
     *     remove: ['script', 'metadata']
     * }
     */
    propFilters: {
        add: [],
        modify: [],
        remove: ['config']
    },

    /**
     * MapReduce의 커맨드 라인 파라미터를 수동으로 설정한다.
     * 커맨드 라인 파라미터는 Flamingo2 Workflow Engine에서 props.mapreduce를 Key로 꺼내어 구성한다.
     *
     * @param props UI 상에서 구성한 컴포넌트의 Key Value값
     */
    afterPropertySet: function (props) {
        props.mapreduce = {
            "driver": props.driver ? props.driver : '',
            "jar": props.jar ? props.jar : '',
            "confKey": props.hadoopKeys ? props.hadoopKeys : '',
            "confValue": props.hadoopValues ? props.hadoopValues : '',
            params: []
        };

        if (props.vectorFile) {
            props.mapreduce.params.push("-vectorFile", props.vectorFile);
        }

        if (props.outputFile) {
            props.mapreduce.params.push("-outputFile", props.outputFile);
        }

        if (props.distanceMeasure) {
            props.mapreduce.params.push("-distanceMeasure", props.distanceMeasure);
        }

        if (props.thresholdT1) {
            props.mapreduce.params.push("-thresholdT1", props.thresholdT1);
        }

        if (props.thresholdT2) {
            props.mapreduce.params.push("-thresholdT2", props.thresholdT2);
        }

        if (props.reducerT1) {
            props.mapreduce.params.push("-reducerT1", props.reducerT1);
        }

        if (props.reducerT2) {
            props.mapreduce.params.push("-reducerT2", props.reducerT2);
        }

        if (props.clusterFilterSize) {
            props.mapreduce.params.push("-clusterFilterSize", props.clusterFilterSize);
        }

        if (props.overwrite) {
            props.mapreduce.params.push("-overwrite", props.overwrite);
        }

        if (props.runClustering) {
            props.mapreduce.params.push("-runClustering", props.runClustering);
        }

        if (props.runSequential) {
            props.mapreduce.params.push("-runSequential", props.runSequential);
        }

        if (props.algorithmOption) {
            props.mapreduce.params.push("-algorithmOption", props.algorithmOption);
        }

        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }

        this.callParent(arguments);
    }
});