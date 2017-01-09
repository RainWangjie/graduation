/**
 * Created by gewangjie on 2017/1/4.
 */
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const addressList = Vue.component('list', {
    delimiters: ['${', '}'],
    // 分隔符变成了 ES6 模板字符串的风格
    template: '#tpl_list',
    data: function () {
        return {
            addressList: data_temp
        };
    }
});
const newAddress = Vue.component('newAddress', {
    delimiters: ['${', '}'],
    // 分隔符变成了 ES6 模板字符串的风格
    template: '#tpl_new',
    data: () => {
        return {
            province: citys['0'],
            city: citys['0_0'],
            district: citys['0_0_0'],
            addressData: citys,
            selectAddress: {
                province: citys['0'][0],
                city: citys['0_0'][0],
                district: citys['0_0_0'][0],
                detail: ""
            },
            select_province_temp: 0
        };
    },
    methods: {
        _print: () => {
            console.log(this.selectAddress);
        },
        _clearCity: () => {
            this.selectAddress.city = this.city[0];
        },
        _clearDistrict: () => {
            this.selectAddress.district = this.district[0];
        },
        changeProvince: (index) => {
            let city_index = `0_${index}`,
                district_index = `0_${index}_0`;
            this.select_province_temp = index;
            this.city = this.addressData[city_index];
            this.district = this.addressData[district_index];
            this.selectAddress.province = this.province[index];
            this._clearCity();
            this._clearDistrict();
        },
        changeCity: (index) => {
            let district_index = `0_${this.select_province_temp}_${index}`;
            this.district = this.addressData[district_index];
            this.selectAddress.city = this.city[index];
            this._clearDistrict();
        },
        changeDistrict: (index) => {
            this.selectAddress.district = this.district[index];
        }
    }
});
const mangerAddress = Vue.component('mangerAddress', {
    delimiters: ['${', '}'],
    // 分隔符变成了 ES6 模板字符串的风格
    template: '#tpl_manger',
    data: function () {
        return {
            addressList: data_temp
        };
    }
});
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {path: '/addressList', component: addressList},
    {path: '/newAddress', component: newAddress},
    {path: '/mangerAddress', component: mangerAddress}
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app');

// 现在，应用已经启动了！