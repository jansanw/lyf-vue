<template lang="html">
    <div class="page">
        <div class="page-content">
            <von-input type="text" v-model="name" label="姓名"></von-input>
            <von-input type="tel" v-model="mobile" label="电话"></von-input>
            <hl-item class="item-icon-right" @click.native="choseAdd">地区
                <div class="item-note" v-if="Province && City && District">{{Province}} {{City}} {{District}}</div>
                <div class="item-note" v-else>请选择地区</div>
                <span class="icon ion-ios-arrow-right"></span></hl-item>
            <von-input type="text" v-model="street" placeholder="请填写详细街道地址" label="街道"></von-input>
            <div class="pd-10">
                <button class="button button-assertive button-block" :disabled="ck_save" @click="save_address()">保存
                </button>
            </div>

        </div>
        <!--居住地址三级联动选项-->
        <section class="showChose" v-show="showChose">
            <section class="address">
                <section class="title">
                    <h4>选择地区</h4>
                    <span @click="closeAdd()">关闭</span>
                </section>
                <section class="title aui-border-b">
                    <div class="area" @click="provinceSelected()" :class="Province?'':'active'">
                        {{Province?Province:'请选择'}}
                    </div>
                    <div class="area" @click="citySelected()" :class="City?'':'active'" v-show="Province">
                        {{City?City:'请选择'}}
                    </div>
                    <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
                        {{District?District:'请选择'}}
                    </div>
                </section>
                <section>
                    <div class="ul" ref="addList">
                        <ul ref="addList_ul">
                            <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)"
                                v-if="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}
                            </li>
                            <li class="addList" v-for="(v,k) in showCityList"
                                @click="getCityId(v.id, v.name, k)" v-if="showCity"
                                :class="v.selected ? 'active' : ''">{{v.name}}
                            </li>
                            <li class="addList" v-for="(v,k) in showDistrictList"
                                @click="getDistrictId(v.id, v.name, k)" v-if="showDistrict"
                                :class="v.selected ? 'active' : ''">{{v.name}}
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import bus from '../../../bus.js'

    export default {
        data() {
            return {
                id: -1,
                name: "",
                mobile: "",
                street: "",
                showChose: false,
                showProvince: true,
                showCity: false,
                showDistrict: false,
                showCityList: false,
                showDistrictList: false,
                province_id: 0,
                city_id: 0,
                district_id: 0,
                GetProvinceId: 2,
                District: false,
                Province: false,
                City: false,
                // v-for循环判断是否为当前
                selected: false,
                info: []
            }
        },
        computed: {
            ck_save: {
                get() {
                    return (this.province_id <= 0 || this.city_id <= 0 || this.district_id <= 0 || this.name === '' || this.mobile === '' || this.street === '');
                },
                set() {

                }
            }
        },
        watch: {
            id(val, oldVal) {
                if (val !== oldVal && val > 0) {
                    if (this.info.length <= 0) {
                        $loading.show();
                        this.getData()
                    } else {
                        this.init_address()
                    }
                }
            },
            info(val, oldVal) {
                if (val.length > 0) {
                }
            }
        },
        methods: {
            _initScroll() {
                if (this.address_scroll) {
                    this.address_scroll.refresh()
                } else {
                    this.address_scroll = new BScroll(this.$refs.addList, {
                        startX: 0,
                        startY: 0,
                        click: true
                    })
                }
            },
            choseAdd() {
                if (this.info.length <= 0) {
                    $loading.show();
                    this.getData()
                } else {
                    this.showChose = true;
                    this.$nextTick(() => {
                        this._initScroll()
                    })
                }
            },
            closeAdd() {
                this.showChose = false;
            },
            _filter(add, name, code) {
                let result = [];
                for (let i = 0; i < add.length; i++) {
                    if (code === add[i].id) {
                        result = add[i].children;
                    }
                }
                return result;
            },
            getProvinceId(code, input, index) {
                this.province_id = code;
                this.Province = input;
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
                this.showCityList = this._filter(this.info, 'city', this.province_id);
                // 点击选择当前
                this.info.map(a => a.selected = false);
                this.info[index].selected = true;
                this.$nextTick(() => {

                    this._initScroll()
                })

            },
            provinceSelected() {
                // 清除市级和区级列表
                this.showCityList = false;
                this.showDistrictList = false;
                // 清除市级和区级选项
                this.Province = false;
                this.City = false;
                this.District = false;
                this.province_id = 0;
                this.city_id = 0;
                this.district_id = 0;
                // 选项页面的切换
                this.showProvince = true;
                this.showCity = false;
                this.showDistrict = false;
                this.$nextTick(() => {
                    this._initScroll()
                })
            },
            getCityId(code, input, index) {
                this.city_id = code;
                this.City = input;
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
                this.showDistrictList = this._filter(this.showCityList, 'district', this.city_id);
                // 选择当前添加active
                this.showCityList.map(a => a.selected = false);
                this.showCityList[index].selected = true;
                this.$nextTick(() => [
                    this._initScroll()
                ])
            },
            citySelected() {
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;

                // 清除市级和区级选项
                this.City = false;
                this.District = false;
                this.city_id = 0;
                this.district_id = 0;
                this.$nextTick(() => [
                    this._initScroll()
                ])
            },
            getDistrictId(code, input, index) {
                this.district_id = code;
                this.District = input;
                // 选择当前添加active
                this.showDistrictList.map(a => a.selected = false);
                this.showDistrictList[index].selected = true;
                // 选取市区选项之后关闭弹层
                this.showChose = false;
                this.$nextTick(() => {
                    this._initScroll()
                })
            },
            districtSelected() {
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
                this.$nextTick(() => [
                    this._initScroll()
                ])
            },
            getData() {
                this.$api.userGet("area.json", res => {
                    this.info = res.data.data;
                    if (this.id === 0)
                        this.showChose = true;
                    else
                        this.init_address();
                    $loading.hide();
                    this.$nextTick(() => {
                        this._initScroll();
                        this.choseAdd();
                    });
                }, error => {
                    $dialog.alert({content: "网络异常，请重试"});
                })
            },
            init_address() {
                this.info.filter((province, k) => {
                    if (province.id === this.province) {
                        this.getProvinceId(province.id, province.name, k);
                        province.children.filter((city, kk) => {
                            if (city.id === this.city) {
                                this.getCityId(city.id, city.name, kk);
                                city.children.filter((district, kkk) => {
                                    if (district.id === this.district) {
                                        this.getDistrictId(district.id, district.name, kkk)
                                    }
                                })
                            }
                        })
                    }
                })
            },
            save_address() {
                $loading.show();
                this.$api.userAuthPost(this.id === -1 ? "address/create" : "address/update", {
                    id: this.id,
                    province_id: this.province_id,
                    city_id: this.city_id,
                    district_id: this.district_id,
                    name: this.name,
                    mobile: this.mobile,
                    area: this.Province + ' ' + this.City + ' ' + this.District,
                    street: this.street
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        bus.$emit("onEditAddress", data);
                    });
                });
            },
        }
    }
</script>

<style lang="css">
    .myAddress {
        width: 100%;
        background-color: white;
        border-top: 4px solid rgba(245, 245, 245, 1);
        color: #333;
    }

    .myAddress .cont {
        border-bottom: 1px solid rgba(245, 245, 245, 0.8);
    }

    .myAddress .cont span {
        display: inline-block;
        font-size: 0.28rem;
        color: #333;
        line-height: 0.88rem;
        margin-left: 0.32rem;
    }

    .myAddress .cont section {
        float: left;
    }

    .myAddress .cont p {
        display: inline-block;
        font-size: 0.28rem;
        color: #333333;
        line-height: 0.88rem;
        margin-left: 1rem;
    }

    .myAddress .cont .pic2 {
        float: right;
        width: 0.14rem;
        height: 0.24rem;
        margin: 0.32rem 0.32rem 0.32rem 0;
    }

    .myAddress .cont p.text {
        margin-left: 0.72rem;
    }

    .showChose {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 120;
        background: rgba(0, 0, 0, 0.5);
    }

    .address {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 121;
        background: #fff;
        width: 100%;
    }

    .title h4 {
        display: inline-block;
        font-weight: normal;
        color: #999;
        margin: 0;
        padding: 0 0 0 .27rem;
        font-size: .4rem;
        line-height: 1.2rem;
    }

    .title span {
        font-size: 0.45rem;
        position: absolute;
        right: 0;
        width: 1.2rem;
        height: 1.2rem;
        text-align: center;
        vertical-align: middle;
        line-height: 1.2rem;
        font-size: .4rem;
        color: #EA5A49;
    }

    .title.aui-border-b {
        text-align: center;
    }

    .area {
        display: inline-block;
        font-size: .37rem;
        line-height: 0.88rem;
        color: #333;
        padding: 0 .4rem;
    }

    .addList {
        width: 100%;
        padding-left: 0.32rem;
        line-height: 1.2rem;
        color: #333;
        font-size: .37rem;
    }

    /* 修改的格式 */
    .address .ul {
        width: 100%;
        max-height: 8rem;
        min-height: 8rem;
        overflow: hidden;
    }

    .address ul li {
        text-align: center;
    }

    .address .title .active {
        color: #EA5A49;
        padding: 0 .27rem;
        border-bottom: .05rem solid #EA5A49;
    }

    .address ul .active {
        color: #EA5A49;
    }
</style>
