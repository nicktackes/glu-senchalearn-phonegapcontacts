rm www/lib/glu/glu-js-min.js

yuicompress -o www/lib/glu/glu-js-min.js \
    www/lib/glu/src/Glu.js \
    www/lib/glu/src/Glu.MemoryManager.js \
    www/lib/glu/src/Glu.ComponentManager.js \
    www/lib/glu/src/Glu.GeoUtility.js \
    www/lib/glu/src/Glu.DelayedTask.js \
    www/lib/glu/src/Glu.Observable.js \
    www/lib/glu/src/Glu.Types.js \
    www/lib/glu/src/Glu.Operators.js \
    www/lib/glu/src/Glu.Filterable.js \
    www/lib/glu/src/Glu.Sortable.js \
    www/lib/glu/src/Glu.Ajax.js \
    www/lib/glu/src/Glu.UI.js \
    www/lib/glu/src/Glu.Binder.js \
    www/lib/glu/src/Glu.Model.js \
    www/lib/glu/src/Glu.ModelManager.js \
    www/lib/glu/src/Glu.ViewModel.js \
    www/lib/glu/src/Glu.StoreManager.js \
    www/lib/glu/src/core/senchatouch/Utils.js \
    www/lib/glu/src/core/senchatouch/Provider.js \
    www/lib/glu/src/core/senchatouch/ComponentManager.js \
    www/lib/glu/src/core/senchatouch/Store.js \
