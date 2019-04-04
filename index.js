import cirlceMenu from './circleMenu.vue';
let $vm;

const circleMenuPlugin = {
    install(vue) {
        let Circle = vue.extend(cirlceMenu);
        if (!$vm) {
            $vm = new Circle({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el);
        }
        vue.prototype.$circleMenu = {
            show(cfg = {}) {
                $vm.showMenu = true;
                for (let key in cfg) {
                    $vm[key] = cfg[key];
                }
                $vm.callback = cfg.callback;
            }
        }

    }
}
export default circleMenuPlugin;