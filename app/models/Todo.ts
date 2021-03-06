/// <reference path="IExportableModel.d.ts"/>

module models {
    export class Todo extends Backbone.Model implements IExportableModel {
        public config = Todo.config;
        public exportsDefinition = Todo.exportsDefinition
        static config = {
            columns: { 
                task          : 'text',
                lastModifiedAt: 'numeric',
                createdAt     : 'numeric',
                done          : 'text'
            },
            adapter: {
                type: 'sql',
                collection_name: 'Todo'
            }
        };
        static exportsDefinition = {
            config: Todo.config,
            extendModel: (Model: Backbone.Model) => {
                _.extend(Model.prototype, Todo.prototype);
                return Model;
            },
            extendCollection: (Collection: Backbone.Collection) => {
                _.extend(Collection.prototype, {
                    // extended functions and properties go here
                });
                return Collection;
            }
        };
        
        constructor(attributes?: any, options?: any) { 
            super(attributes, options);
        }
        
        /**
         * モデルの属性を操作する直前に呼ばれるメソッドで、値を検証する処理を記述します。
         */
        public validate(attr: any) {
            if (attr.task.length <= 0) { return Util.TI.Locale.getString('validate.task.empty'); }
            else { return; }
        }
        
        /**
         * modelのデータをJSONオブジェクトに変換して返します。
         */
        public toJSON(options?: any): typeof Todo.config.columns {
            return super.toJSON(options);
        }

        /**
         * toJSONで返却されるオブジェクトに拡張メンバを追加して返します。
         * @return Object
         */
        public toJsonExtended(options?: any) {
            var obj = this.toJSON(options);
            var format = 'YYYY/MM/DD H:mm';
            var extObj = _.extend(obj, {
                lastModifiedAtFormatted: this.formatted('lastModifiedAt', format),
                createdAtFormatted     : this.formatted('createdAt', format),
                stateText:  obj.done === true.toString() ? 'Done' : 'Todo',
                stateColor: obj.done === true.toString() ? 'blue' : 'red'
            });
            return extObj;
        }
        
        /**
         * use moment.js format function
         */
        private formatted(columnName: string, format: string) {
            var moment: MomentStatic = require('alloy/moment'); 
            return moment(Number(this.get(columnName))).format(format);
        }
    }
}

declare var exports: any;
exports.definition = models.Todo.exportsDefinition;