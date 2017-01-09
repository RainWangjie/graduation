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
    // props: ['addressData'],//父组件传递
    data: function () {
        return {
            postData: {
                name: 'Mr.Rain',
                phone: '15757115750',
                selectAddress: {
                    province: citys['0'][0],
                    city: citys['0_0'][0],
                    district: citys['0_0_0'][0],
                    detail: ''
                },
                status: 0
            },
            selectAddress: {
                province: 0,
                city: 0,
                district: 0,
            },
            province: citys['0'],
            city: citys['0_0'],
            district: citys['0_0_0'],
        };
    },
    created: function () {
        console.log(router);
        var id = router.query.id || '无参数id';
    },
    methods: {
        _print: function () {
            console.log(this.postData.selectAddress);
        },
        _initCity: function () {
            this.selectAddress.city = 0;
        },
        _initDistrict: function () {
            this.selectAddress.district = 0;
        },
        _changePostData: function () {
            this.postData.selectAddress.province = this.province[this.selectAddress.province];
            this.postData.selectAddress.city = this.city[this.selectAddress.city];
            this.postData.selectAddress.district = this.district[this.selectAddress.district];
        },
        changeProvince: function () {
            var temp_city = `0_${this.selectAddress.province}`,
                temp_district = `0_${this.selectAddress.province}_${this.selectAddress.city}`;
            this.city = citys[temp_city];
            this.district = citys[temp_district];
            this._initCity();
            this._initDistrict();
            this._changePostData();
            this._print();
        },
        changeCity: function () {
            var temp_district = `0_${this.selectAddress.province}_${this.selectAddress.city}`;
            this.district = citys[temp_district];
            this._initDistrict();
            this._changePostData();
            this._print();
        },
        changeDistrict: function () {
            this._changePostData();
            this._print();
        },
        postData: function () {

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
    },
    methods: {
        editAddress: function (event, id) {
            // 跳转到新增地址页面
            console.log(`跳转到Id为${id}的地址编辑页`);
            router.go({path: `/newAddress?id=${id}`});
        },
        deleteAddress: function (event, id) {
            alert(`删除Id为${id}的地址`);
        },
        setStatus: function (event, id) {
            if (this.addressList[id].id == id) {
                for (var i in this.addressList) {
                    this.addressList[i].status = 0;
                }
                this.addressList[id].status = 1;
            } else {
                alert('数据错误')
            }

        }
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
    routes// （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router: router,
}).$mount('#app');

// 现在，应用已经启动了！