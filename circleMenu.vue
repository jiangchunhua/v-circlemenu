<template>
    <div>
        <div class="circle_menu" v-show="showMenu" :style="direction">
            <div class="circe_box fixed">
                <div class="circle_list">
                    <div
                        class="circle_btn"
                        @click="toggleShow"
                        :style="mainMenuStyle"
                        :class="{'active': show}"
                    >{{menuTitle}}</div>
                    <div class="circle_box">
                        <div
                            class="circle_item"
                            v-for="(i, index) in menu"
                            :key="index"
                            :style="{transform: 'translate(' + i.x + 'px,' + i.y + 'px)', background: i.bg}"
                            @click="callback(i)"
                        >
                            <div class="circle_item_name" :class="{'active': show}">{{i.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="circle_shadow" v-show="showShadow && show" @click="toggleShow"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false, //是否显示菜单
            angle: [180, 270], //起始角度和终止角度
            menuTitle: "菜单", //主菜单文案
            radius: 100, //主菜单和子菜单之间的距离
            showShadow: true, //是否显示shadow背景
            mainMenuStyle: {
                background: "#fcc",
                color: "#fff"
            },
            direction: {
                left: "10px",
                bottom: "5px"
            }, //具体职位
            show: false, //二级菜单是否显示
            menu: [
                {
                    name: "子一",
                    router: "credit",
                    bg: "#c179f5"
                },
                {
                    name: "子二",
                    router: "main",
                    bg: "#63b5f1"
                }
            ] //子菜单
        };
    },
    computed: {
        rotateAngle() {
            return this.show ? "180deg" : 0;
        },
        thisRadius() {
            return this.show ? this.radius : 0;
        }
    },
    components: {},
    methods: {
        d2c(d) {
            return (d * Math.PI) / 180;
        },
        toggleShow() {
            this.show = !this.show;
            this.caculatePosition();
        },
        caculatePosition() {
            // this.radius = this.show ? this.radius : 0;
            for (var i = 0; i < this.menu.length; i++) {
                this.menu[i].x = ~~(
                    this.thisRadius *
                    Math.cos(
                        this.d2c(
                            this.angle[0] +
                                i *
                                    ((this.angle[1] - this.angle[0]) /
                                        (this.menu.length - 1))
                        )
                    )
                );
                this.menu[i].y = ~~(
                    this.thisRadius *
                    Math.sin(
                        this.d2c(
                            this.angle[0] +
                                i *
                                    ((this.angle[1] - this.angle[0]) /
                                        (this.menu.length - 1))
                        )
                    )
                );
            }
        },
        callback() {
            this.caculatePosition();
        },
        watchDocumentClick(ev) {
            if (
                ev.target.className != "circle_btn" &&
                ev.target.className != "circle_btn"
            ) {
                this.show = false;
                this.caculatePosition();
            }
        }
    },
    mounted() {
        document.addEventListener("click", this.watchDocumentClick, false);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.watchDocumentClick, false);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@circleWidth: 35px;
.circle_menu {
    position: fixed;
    width: 35px;
    height: 35px;
    z-index: 10000;
}
.circle_shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.circle_btn {
    width: @circleWidth;
    height: @circleWidth;
    border-radius: 50%;
    line-height: @circleWidth - 5;
    text-align: center;
    font-size: 14px;
    position: absolute;
    transition: all 0.5s ease;
    z-index: 1000;
    &.active {
        background: black;
        transform: rotate(360deg);
    }
}
.circle_list {
    position: relative;
}
.circle_item {
    position: absolute;
    transition: all 0.5s ease;
    width: @circleWidth;
    height: @circleWidth;
    line-height: @circleWidth;
    text-align: center;
    color: #fff;
    border-radius: 50%;
}
.circle_item_name {
    transform: rotate(0);
    transition: all 0.5s ease;
    &.active {
        transform: rotate(360deg);
    }
}
</style>
