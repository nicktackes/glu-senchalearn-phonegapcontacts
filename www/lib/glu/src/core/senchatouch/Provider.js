Argon.UI.regFactory('panel', function(config) {
    return new Ext.Panel(config);
});
Argon.UI.regFactory('label', function(config) {
    return new Ext.form.Text(config);
});
Argon.UI.regFactory('button', function(config) {
    return new Ext.Button(config);
});
Argon.UI.regFactory('list', function(config) {
    return new Ext.dataview.List(config);
});
Argon.UI.regFactory('video', function(config) {
    return new Ext.Video(config);
});
Argon.UI.regFactory('carousel', function(config) {
    return new Ext.Carousel(config);
});
Argon.UI.regFactory('specialslist', function(config) {
    return new Ext.ux.SpecialsList(config);
});
Argon.UI.regFactory('venueslist', function(config) {
    return new Ext.ux.VenuesList(config);
});

Argon.UI.regFactory('radarchart', function(config) {
    return new Ext.ux.RadarChartClass(config);
});

Argon.UI.regFactory('emailfield', function(config) {
    return new Ext.form.Email(config);
});

Argon.UI.regFactory('datetimerangefield', function(config) {
    return new Ext.ux.touch.DateTimeRangeField(config);
});

Argon.UI.regFactory('toolbar', function(config) {
    return new Ext.Toolbar(config);
});

Argon.UI.regFactory('tsheadertoolbar', function(config) {
    return new Ext.ux.TSHeaderToolbar(config);
});

Argon.UI.regFactory('textfield', function(config) {
    return new Ext.form.Text(config);
});

Argon.UI.regFactory('field', function(config) {
    return new Ext.form.Field(config);
});

Argon.UI.regFactory('numberfield', function(config) {
    return new Ext.form.Number(config);
});

Argon.UI.regFactory('imagefield', function(config) {
    return new Ext.ux.form.ImageField(config);
});

Argon.UI.regFactory('labelfield', function(config) {
    return new Ext.ux.form.LabelField(config);
});

Argon.UI.regFactory('instructionfield', function(config) {
    return new Ext.ux.form.InstructionField(config);
});

Argon.UI.regFactory('venuefield', function(config) {
    return new Ext.ux.form.VenueField(config);
});

Argon.UI.regFactory('imageeditor', function(config) {
    return new Ext.ux.form.ImageEditor(config);
});

Argon.UI.regFactory('searchfield', function(config) {
    return new Ext.form.Search(config);
});

Argon.UI.regFactory('checkboxfield', function(config) {
    return new Ext.ux.form.Checkbox(config);
});

Argon.UI.regFactory('textareafield', function(config) {
    return new Ext.form.TextArea(config);
});

Argon.UI.regFactory('multiselectfield', function(config) {
    return new Ext.form.ux.touch.MultiSelect(config);
});

Argon.UI.regFactory('datepickerfield', function(config) {
//    return new Ext.form.DatePicker(config);
    return new Ext.ux.DatePicker(config);
});

Argon.UI.regFactory('calendarpickerfield', function(config) {
    return new Ext.form.ux.touch.CalendarPickerField(config);
});

Argon.UI.regFactory('timepickerfield', function(config) {
    return new Ext.ux.form.TimePicker(config);
});

Argon.UI.regFactory('spacer', function(config) {
    return new Ext.Spacer(config);
});

Argon.UI.regFactory('urlfield', function(config) {
    return new Ext.form.Url(config);
});

Argon.UI.regFactory('selectfield', function(config) {
    return new Ext.ux.form.Select(config);
});

Argon.UI.regFactory('hiddenfield', function(config) {
    return new Ext.form.Hidden(config);
});

Argon.UI.regFactory('passwordfield', function(config) {
    return new Ext.form.Password(config);
});

Argon.UI.regFactory('radiofield', function(config) {
    return new Ext.form.Radio(config);
});

Argon.UI.regFactory('hiddenfield', function(config) {
    return new Ext.form.Hidden(config);
});

Argon.UI.regFactory('fieldset', function(config) {
    return new Ext.form.FieldSet(config);
});

Argon.UI.regFactory('qrcode', function(config) {
    return new Ext.ux.touch.QRCode(config);
});

Argon.UI.FieldsetBindingAdapter = {
};

Argon.UI.QrcodeBindingAdapter = {
};

Argon.UI.regFactory('wizard', function(config) {
    return new Ext.ux.Wizard(config);
});

Argon.UI.WizardBindingAdapter = {
};

Argon.UI.regFactory('nextstep', function(config) {
    return new Ext.ux.WizardStepNext(config);
});

Argon.UI.WizardstepnextBindingAdapter = {
};

Argon.UI.regFactory('yesnostep', function(config) {
    return new Ext.ux.WizardStepYesNo(config);
});

Argon.UI.WizardstepyesnoBindingAdapter = {
};

Argon.UI.regFactory('formpanel', function(config) {
    return new Ext.form.FormPanel(config);
});
Argon.UI.FormpanelBindingAdapter = {
};

Argon.UI.regFactory('googledirectionspanel', function(config) {
    return new Ext.ux.GoogleDirectionsPanel(config);
});
Argon.UI.GoogledirectionspanelBindingAdapter = {
};

Argon.UI.regFactory('specialsform', function(config) {
    return new Ext.ux.form.SpecialsForm(config);
});
Argon.UI.SpecialsformBindingAdapter = {
};

Argon.UI.regFactory('specialsrecurrence', function(config) {
    return new Ext.ux.SpecialsRecurrence(config);
});
Argon.UI.SpecialsrecurrenceBindingAdapter = {
};

Argon.UI.regFactory('venuesform', function(config) {
    return new Ext.ux.form.VenuesForm(config);
});
Argon.UI.VenuesformBindingAdapter = {
};


Argon.UI.regFactory('accountsform', function(config) {
    return new Ext.ux.form.AccountsForm(config);
});
Argon.UI.AccountsformBindingAdapter = {
};


Argon.UI.regFactory('newaccountwizard', function(config) {
    return new Ext.ux.form.NewAccountWizard(config);
});
Argon.UI.NewaccountwizardBindingAdapter = {
};

Argon.UI.regFactory('venueslocationform', function(config) {
    return new Ext.ux.form.VenuesLocationForm(config);
});
Argon.UI.VenueslocationformBindingAdapter = {
};

Argon.UI.regFactory('imagefolderpanel', function(config) {
    return new Ext.ux.ImageFolderPanel(config);
});
Argon.UI.ImagefolderpanelBindingAdapter = {
};

Argon.UI.regFactory('iframe', function(config) {
    return new Ext.ux.IFrameComponent(config);
});
Argon.UI.IframeBindingAdapter = {
};

Argon.UI.regFactory('geocoder', function(config) {
    return new Ext.ux.Geocoder(config);
});
Argon.UI.GeocoderBindingAdapter = {
};

Argon.UI.regFactory('hoursofoperation', function(config) {
    return new Ext.ux.HoursOfOperation(config);
});
Argon.UI.HoursofoperationBindingAdapter = {
};

Argon.UI.regFactory('hoursofoperationfield', function(config) {
    return new Ext.ux.HoursOfOperationField(config);
});
Argon.UI.HoursofoperationfieldBindingAdapter = {
    byNameProperty:'value'
};

Argon.UI.regFactory('paymenttype', function(config) {
    return new Ext.ux.PaymentType(config);
});
Argon.UI.PaymenttypeBindingAdapter = {
};

Argon.UI.regFactory('paymenttypefield', function(config) {
    return new Ext.ux.PaymentTypeField(config);
});
Argon.UI.PaymenttypefieldBindingAdapter = {
    byNameProperty:'value'
};

Argon.UI.regFactory('map', function(config) {
    return new Ext.Map(config);
});
Argon.UI.MapBindingAdapter = {
};

Argon.UI.regFactory('tabpanel', function(config) {
    return new Ext.TabPanel(config);
});
Argon.UI.TabpanelBindingAdapter = {
};
Argon.UI.HiddenfieldBindingAdapter = {
    byNameProperty:'value'
};

Argon.UI.TextfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.FieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.VenuefieldBindingAdapter = {
//    byNameProperty:'value'
};
Argon.UI.NumberfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.ImagefieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.LabelfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.InstructionfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.ImageeditorBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.PasswordfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.SearchfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.MultiselectfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.CheckboxfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.RadiofieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.SpacerBindingAdapter = {

};
Argon.UI.RowBindingAdapter = {

};
Argon.UI.RadarchartBindingAdapter = {

};
Argon.UI.DatetimerangefieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.EmailfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.HiddenfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.UrlfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.DatepickerfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.CalendarpickerfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.TimepickerfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.SelectfieldBindingAdapter = {
    byNameProperty:'value'
};
Argon.UI.ToolbarBindingAdapter = {

};
Argon.UI.TsheadertoolbarBindingAdapter = {

};
Argon.UI.TextareafieldBindingAdapter = {
    byNameProperty:'value'
};

Argon.UI.PanelBindingAdapter = {

};
Argon.UI.LabelBindingAdapter = {
    byNameProperty: 'text',
    setValue: function(value, oldValue, options, control) {
        if (control.customConfig && control.customConfig['_storeName'] && control.customConfig['text'] && control.customConfig['text_replacementVariables'] && Argon.isArray(control.customConfig['text_replacementVariables'])) {
            var replacementVars = control.customConfig['text_replacementVariables'];
            var valueTemplate = control.customConfig['text'];
            var store = Argon.StoreManager.get(control.customConfig['_storeName']);
            var selectedRecord = store.getSelectedRecord();
            if (store && selectedRecord) {
                for (var i = 0; i < replacementVars.length; i++) {
                    valueTemplate = valueTemplate.replace('${'+replacementVars[i]+'}', selectedRecord[replacementVars[i]]);
                }
            }
            control.setText(valueTemplate);
        }
        else {
            control.setText(value);
        }
    }
};

Argon.UI.ButtonBindingAdapter = {
    isCommandOriented:true
};

Argon.UI.VideoBindingAdapter = {
};

Argon.UI.ListBindingAdapter = {
};
Argon.UI.CarouselBindingAdapter = {
};

Argon.UI.SpecialslistBindingAdapter = {
};
Argon.UI.VenueslistBindingAdapter = {
};

Argon.UI.TableBindingAdapter = {
    setValue: function(value, oldValue, options, control) {
        if (!options || !options.modelPropName) {
            Ti.API.error('TableBindingAdapter: No modelPropName was provided in the options structure.  Unable to dispatch the setValue event.');
        }
        var modelPropName = options.modelPropName;
        var controlPropName = Argon.Binder.findControlProperty(modelPropName, control.customConfig);
        if (controlPropName) {
            Argon.UI.TableBindingAdapter[controlPropName + 'Bindings'].setValue(value, oldValue, options, control);
        }
        else {
            Ti.API.error('TableBindingAdapter: Unable to locate the control property for model property ' + modelPropName + ' so the setValue handler could not be dispatched.');
        }
    },

    storeBindings: {
        alwaysBind: true,
        onInit: function(binding, control) {
            // we need to load the table with the current contents of the store
            var modelPropName = binding['modelPropName'];
            if (modelPropName) {
                var model = Argon.ModelManager.get(modelPropName);
                var store = this[modelPropName];
                if (store) {
                    var data = store.records();
                    if (data && Argon.isArray(data)) {
                        for (var i = 0; i < data.length; i++) {
                            Argon.UI.TableUtil.addRecord(control, data[i], model);
                        }
                    }
                }
            }
        },
        setValue: function(value, oldValue, options, control) {
            Ti.API.info('TableBindingAdapter.storeBindings.setValue options ' + JSON.stringify(options));
            // handle add, update, remove
            if (control) {
                if (!options.modelName) {
                    Ti.API.error('TableBindingAdapter.storeBindings no modelName was provided.');
                    return;
                }
                var model = Argon.ModelManager.get(options.modelName);
                if (!model) {
                    Ti.API.error('TableBindingAdapter.storeBindings a model could not be retrieved from ModelManager for model ' + options.modelName);
                    return;
                }
                if (options.action) {
                    switch (options.action) {
                        case Argon.Store.ADDRECORD:
                            Argon.UI.TableUtil.addRecord(control, value, model);
                            break;
                        case Argon.Store.UPDATERECORD:
                            // TODO: field level updates instead of delete/add
                            Argon.UI.TableUtil.removeRecord(control, value, model);
                            Argon.UI.TableUtil.addRecord(control, value, model);
                            break;
                        case Argon.Store.REMOVERECORD:
                            Argon.UI.TableUtil.removeRecord(control, value, model);
                            break;
                        case Argon.Store.FILTERRECORD:
                            //Argon.UI.TableUtil.removeRecord(control, value, model);
                            break;
                        case Argon.Store.UNFILTERRECORD:
                            //Argon.UI.TableUtil.addRecord(control, value, model);
                            break;
                        case Argon.Store.SORTRECORDS:
                            Argon.UI.TableUtil.sortRecords(control, value, model);
                            break;
                        case Argon.Store.RELOADRECORDS:
                            Argon.UI.TableUtil.sortRecords(control, value, model);
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        eventName: 'storeChanged',
        eventConverter: function(e) {
            return e;
        }
    }
};


Argon.UI.TableUtil = {
    // locate the record index
    findRecordIndex: function(control, model, id) {
        try {
            var keyField = model.getKeyField().name;
            if (control && control.data && Argon.isArray(control.data) && control.data.length > 0) {
                for (var i = 0; i < control.data[0].rows.length; i++) {
                    if (control.data[0].rows[i].data && control.data[0].rows[i].data[keyField] && control.data[0].rows[i].data[keyField] == id) {
                        return i;
                    }
                }
            }

            return -1;
        }
        catch(exc) {
            // titanium race condition
            return -1;
        }
    },
    findRecord: function(control, model, id) {
        var keyField = model.getKeyField().name;
        try {
            if (control && control.data && Argon.isArray(control.data) && control.data.length > 0) {
                for (var i = 0; i < control.data[0].rows.length; i++) {
                    if (control.data[0].rows[i].data && control.data[0].rows[i].data[keyField] && control.data[0].rows[i].data[keyField] == id) {
                        return control.data[0].rows[i];
                    }
                }
            }

            return null;
        }
        catch(exc) {
            return null;
        }
    },
    sortRecords: function(control, data, model) {
        if (data && Argon.isArray(data)) {
            Argon.UI.TableUtil.removeAll(control);

            // load sorted data
            for (var i = 0; i < data.length; i++) {
                Argon.UI.TableUtil.addRecord(control, data[i], model);
            }
        }
    },
    removeAll: function(control) {
        var view = Argon.ComponentManager.getView('List');
        if (control && control.data && Argon.isArray(control.data) && control.data.length > 0) {
            for (var i = 0; i < control.data[0].rows.length; i++) {
                Argon.ComponentManager.remove(control.data[0].rows[i], view);
            }
        }
        control.setData([]);
        if (control.customConfig['collapseAll']) {
            control.customConfig['collapseAll'](control);
        }
    },
    removeRecord: function(control, value, model) {
        try {
            var keyValue = model.getKeyValue(value);
            if (!keyValue) {
                Ti.API.error('Argon.UI.TableUtil.removeRecords a key value could not be obtained from the model.');
                Ti.API.error('Model: ' + JSON.stringify(model));
                Ti.API.error('Value: ' + JSON.stringify(value));
                return;
            }
            var index = Argon.UI.TableUtil.findRecordIndex(control, model, keyValue);
            if (index > -1) {
                control.deleteRow(index);
            }
        }
        catch(exc) {
            // titanium doesn't have a consistent internal structure in terms of rows of a table.  after a delete,
            // internal arrays are out of sync.  trap and swallow exception.
            Ti.API.error(exc);
        }
    },
    setRecordVisibility: function(control, value, model, show) {
        if (!value) {
            Ti.API.error('Argon.UI.TableUtil.setRecordVisibility a key value was not provided.');
            return;
        }
        var row = Argon.UI.TableUtil.findRecord(control, model, value);
        if (row) {
            (show ? row.children[0].show() : row.children[0].hide());
        }
    },
    addRecord: function(control, value, model) {
        // if record exists, return.  this is only a safety check
        var keyValue = model.getKeyValue(value);
        var row = Argon.UI.TableUtil.findRecord(control, model, keyValue);
        if (row) {
            Ti.API.info('addRecord aborted because row was found.');
            return;
        }

        if (control.customConfig['rowRenderer']) {
            var newRow = control.customConfig['rowRenderer'](control, value, model);
            control.appendRow(newRow);
        }
        else {
            //TODO: add concept of a defaultRenderer
        }
        if (control.customConfig.preloadDetails === true && control.customConfig['detailRowRenderer']) {
            var detailRow = control.customConfig['detailRowRenderer'](control, value, model);
            control.appendRow(detailRow);
        }
    }
};
