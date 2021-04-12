Vue.directive('selectpicker', {
	twoWay: true,
	inserted: function (el, binding) {
		$(el).selectpicker();
	},

	update: function (el, binding, vnode) {
		vnode.context.$nextTick(function () {
			$(el).selectpicker('refresh');
		});
	},
	unbind: function (el, binding) {
		$(el).selectpicker('destroy');
	}
});
vue.directive('datepicker', {
    bind: function (el) {
        let dtOptions = {
            format: 'dd M yyyy',
            language: 'en',
            autoclose: true
        };

        const $el = $(el);
        $el.datepicker(dtOptions);
    },
    update: function (el, binding) {
        const $el = $(el);
        // for asp .net mvc datetime values
        if ($el.val().startsWith("/Date")) {
            $el.datepicker("update", new Date(parseInt($el.val().substr(6))));
        }

        let d = $el.datepicker("getDate");
        let currentTime = new Date();
    }
})
Vue.component('my-date-picker', {
    template: '<input type="text" v-datepicker class="datepicker" :value="value" @input="update($event.target.value)">',
    directives: {
        datepicker: {
            inserted(el, binding, vNode) {
                $(el).datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                }).on('changeDate', function (e) {
                    vNode.context.$emit('input', e.format(0))
                })
            }
        }
    },
    props: ['value'],
    methods: {
        update(v) {
            this.$emit('input', v)
        }
    }
});