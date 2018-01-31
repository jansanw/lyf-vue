<style lang="css">

    .bar {
        position: fixed;
    }

    .addresses-list li {
        position: relative;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .address-item-wrap {
        padding: 16px 15px 0;
        min-height: 55px;
        height: auto;
        color: #151516;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
    }

    .address-item-wrap .address-item-main {
        position: relative;
        display: inline-block;
        width: 100%;
        margin-bottom: 14px;
    }

    .address-item-wrap .address-item-main .contact-name {
        margin-bottom: 4px;
    }

    .address-item-ops-1 {
        position: relative;
        display: inline-block;
        width: 32%;
        height: 40px;
        padding-left: 15px;
        text-align: left;
        line-height: 41px;
    }

    .address-item-ops-1 .default {
        color: #e02e24;
    }

    .address-item-ops-1 .address-item-set-default {
        position: relative;
        display: inline-block;
        height: 13px;
        line-height: 1;
        color: #9c9c9c;
        font-size: 13px;
        margin-left: 20px;
        text-align: center;
    }

    .address-item-ops-1 .default:before {
        content: "";
        color: #e02e24;
        line-height: 1;
        font-weight: 400;
        border: none;
    }

    .address-item-ops-1 .address-item-set-default:before {
        content: '';
        position: absolute;
        left: -20px;
        font-size: 14px;
        z-index: 2;
        color: #9c9c9c;
        line-height: 14px;
        width: 14px;
        height: 14px;
        border-radius: 100%;
        border: 1px solid #9c9c9c;
    }

    .address-item-ops-2 {
        position: relative;
        display: inline-block;
        height: 40px;
        padding-right: 15px;
        float: right;
        text-align: right;
        line-height: 41px;
        color: #9c9c9c;
        font-size: 13px;
    }

    .address-item-ops-2 .address-item-edit {
        position: relative;
        display: inline-block;
        width: 1.12rem;
        height: 100%;
    }

    .address-item-ops-2 .address-item-edit span {
        position: relative;
        display: inline-block;
        height: 13px;
        line-height: 1;
    }

    .address-item-ops-2 .address-item-delete {
        position: relative;
        display: inline-block;
        width: 1.12rem;
        height: 100%;
        margin-left: .4rem;
    }

    .address-item-ops-2 .address-item-delete span {
        position: relative;
        display: inline-block;
        height: 13px;
        line-height: 1;
    }

    .mint-popup-100 {
        width: 85%;
        border-radius: .13rem;
    }

    .m-addr-main {
        width: 100%;
        background-color: #fff;
        text-align: center;
        color: #151516;
        font-size: 0;
        border-radius: .13rem;
    }

    .m-addr-main .m-addr-title {
        position: relative;
        height: 1.36rem;
        line-height: 1.33rem;
        font-size: .45rem;
        border-bottom: 0.025rem solid #ededed;
    }

    .m-addr-main .m-address-receiver {
        position: relative;
        width: 100%;
        text-align: left;
    }

    .m-addr-main .m-addr-name {
        width: 50%;
        border-right: 0.025rem solid #ededed;
        border-radius: 0;
    }

    .m-addr-main .m-addr-mobile,
    .m-addr-main .m-addr-name {
        padding: .27rem 0 .27rem .45rem;
        font-size: .4rem;
        line-height: normal;
        height: 1.2rem;
        text-align: left;
        display: inline-block;
        position: relative;
    }

    .m-addr-main .m-addr-mobile {
        width: 48%;
    }

    .m-addr-main .m-addr-mobile,
    .m-addr-main .m-addr-name {
        padding: .27rem 0 .27rem .45rem;
        font-size: .4rem;
        line-height: normal;
        height: 1.2rem;
        text-align: left;
        display: inline-block;
        position: relative;
    }

    .m-addr-main .m-addr-region {
        position: relative;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0;
        text-align: left;
        border-top: 0.025rem solid #ededed;
        border-bottom: 0.025rem solid #ededed;
    }

    .m-addr-city,
    .m-addr-province {
        width: 33%;
        position: relative;
        display: inline-block;
        height: 100%;
        font-size: .4rem;
        overflow: hidden;
    }

    .m-addr-province .m-addr-select {
        padding-left: .45rem;
    }

    .m-addr-select {
        position: relative;
        height: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        box-sizing: border-box;
        background-color: #fff;
    }

    .m-addr-city,
    .m-addr-province {
        width: 33%;
        position: relative;
        display: inline-block;
        height: 100%;
        font-size: .4rem;
        overflow: hidden;
    }

    .m-addr-district {
        position: relative;
        display: inline-block;
        width: 32%;
        height: 100%;
        font-size: .4rem;
        overflow: hidden;
    }

    .m-addr-main .m-addr-address {
        position: relative;
        width: 100%;
        min-height: 1.2rem;
        padding: .27rem .45rem;
        font-size: .4rem;
        text-align: left;
        word-wrap: break-word;
        border-bottom: 0.025rem solid #ededed;
    }

    .m-addr-main .m-addr-save {
        position: relative;
        display: inline-block;
        width: 91%;
        height: 1.15rem;
        line-height: 1.15rem;
        margin: .4rem 0;
        font-size: .45rem;
        color: #fff;
        background-color: #e02e24;
        border-radius: .13rem;
    }

</style>

<template lang="html">

    <div class="page">
        <div class="page-content">
            <div>
                <ul class="addresses-list">
                    <li class="address-item-use" v-for="(address,key,index) in address_list"
                        @click="change_address(key)">
                        <div class="address-item-wrap">
                            <div class="address-item-main">
                                <div class="contact-name">
                                    {{address.name}}，{{address.mobile}}
                                </div>
                                <div class="contact-address">
                                    {{address.area}} {{address.street}}
                                </div>
                            </div>
                        </div>
                        <div class="address-item-ops-1">
                            <i style="margin:5px;" class="text-14"
                               :class="{'color-assertive':address.is_default== 1,' ion-ios-checkmark':address.is_default== 1,'ion-ios-circle-outline':address.is_default== 0}"></i><span
                                @click="set_address_default(address.id)">默认地址</span>
                        </div>
                        <div class="address-item-ops-2">
                            <div class="address-item-edit" @click="edit_address(address.id)">
                                <span><i class="ion-compose"></i> 编辑</span>
                            </div>
                            <div class="address-item-delete" @click="del_address(address.id, key)">
                                <span><i class="ion-trash-a"></i> 删除</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="pd-10">
                <button class="button button-assertive button-block" @click="add_address()">添加地址</button>
            </div>
        </div>
    </div>

</template>

<script>
    import address_from from './address-from.vue'
    import bus from '../../../bus.js'

    export default {
        name: "address_list",
        data() {
            return {
                edit_address_modal: null,
                address_list: [],
            }
        },
        destroyed() {
            if (this.edit_address_modal)
                $modal.destroy(this.edit_address_modal)
        },
        mounted() {
            $loading.show();
            this.getData();
            $modal.fromComponent(address_from, {
                title: '地址管理',
                theme: 'default'
            }).then((modal) => {
                this.edit_address_modal = modal
            });
            bus.$on("onEditAddress", res => {
                this.getData();
                this.edit_address_modal.hide();
            })

        },
        methods: {
            getData() {
                this.$api.userAuthGet("address/lists", rps => {
                    $loading.hide();
                    this.$api.responseFilter(rps.data, data => {
                        this.address_list = data.list;
                    });
                })
            },
            add_address() {
                this.edit_address_modal.show()
            },
            edit_address(id) {
                this.address_list.filter(item => {
                    return item.id === id;
                }).map(item => {
                    this.edit_address_modal.content.id = id;
                    this.edit_address_modal.content.name = item.name;
                    this.edit_address_modal.content.mobile = item.mobile;
                    this.edit_address_modal.content.street = item.street;
                    this.edit_address_modal.content.province_id = item.province_id;
                    this.edit_address_modal.content.city_id = item.city_id;
                    this.edit_address_modal.content.district_id = item.district_id;
                    let area = item.area.split(" ");
                    this.edit_address_modal.content.Province = area[0] || '';
                    this.edit_address_modal.content.City = area[1] || '';
                    this.edit_address_modal.content.District = area[2] || '';
                });
                console.log(this.edit_address_modal);
                this.edit_address_modal.show()
            },
            del_address(id, key) {
                if (this.address_list.length <= 1) {
                    $toast.show("至少保留一个地址吧~");
                    return;
                }

                $dialog.confirm({
                    title: '确认要删除吗?'
                }).then((res) => {
                    if (res) {
                        $loading.show();
                        this.$api.userAuthGet("address/delete?id=" + id, rps => {
                            this.$api.responseFilter(rps.data, () => {
                                this.address_list.splice(key, 1);
                                let has_default = false;
                                this.address_list.forEach(item => {
                                    has_default = has_default || item.is_defalut === 1;
                                });
                                if (!has_default)
                                    this.set_address_default(this.address_list[0].id);
                            });
                        });
                    }
                })
            },
            set_address_default(id) {
                $loading.show();
                this.$api.userAuthGet("address/set_default?id=" + id, rps => {
                    this.$api.responseFilter(rps.data, () => {
                        this.address_list.map(item => {
                            item.is_default = item.id === id ? 1 : 0;
                        });
                    });
                })
            },
            change_address(key) {
                let address = this.address_list[key];
                bus.$emit("onChangeAddress", address);
            }
        }
    }
</script>
