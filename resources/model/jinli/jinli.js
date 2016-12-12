/**
 * Created by gewangjie on 16/8/15.
 */
function _App() {
    this.pageWrap = $(".main-container"), this.h = $(window).height(), this.w = $(window).width(), this.bgAudio = null, this.formalURL = "wutaiwei.com", this.loadingManager = null, this.scene = null, this.renderer = null, this.stats = !0, this.statsEnabled = !1, this.phone = null, this.modelContainer = null, this.modelLoader = null, this.mainCamera = null, this.cameraCube = null, this.sceneCube = null, this.controls = null, this.mesh = null, this.spotLight = null, this.freeMode = 0, this.path = {
        test: "",
        product: "",
        media: ""
    }, this.interface = {}
}
_App.prototype = {
    init: function () {
        var a = this;
        a.checkFormalEnv() && (console.log("正式环境"), a.initWeChatShare()), a.styleDataInit(), a.resControl(), a.orientation()
    }, styleDataInit: function () {
        var a = this;
        $(window).on("touchmove scroll", function (e) {
            "mobileNumber" != e.target.id && e.preventDefault()
        }), document.body.style.userSelect = "none", document.body.style.mozUserSelect = "none", document.body.style.webkitUserSelect = "none", $("#progressBar,#loadingPeople").css({"background-size": +a.w + "px " + a.h + "px"}).show();
        var c = window.onresize = function () {
            pageResponse({
                selectors: ".param-dialog",
                mode: IsPC() ? "contain" : "cover",
                width: 640,
                height: isWeixin() ? 1008 : 1140,
                origin: "center top 0"
            })
        };
        c()
    }, resControl: function () {
        var a = this;
        _imgs = ["3d_bg.jpg", "123.jpg", "bg_1.jpg", "M.jpg", "close_btn.png", "loading_people.png", "loading_light.png", "loading_bg.jpg", "timg.jpg", "page_2_icon_1.png", "page_2_icon_2.png", "page_2_icon_3.png", "page_2_icon_4.png", "s6_maps.jpg"], _proLoad = new PreLoad(_imgs, ".progress", {
            prefix: "images/",
            progressInit: !1,
            vision: "1.3",
            events: {
                preLoadComplete: [function () {
                    a.isAndriod() && a.checkFormalEnv(), a.action()
                }], preLoadProgress: [function (a) {
                    $("#progressBar").width(.55 * a + "%")
                }]
            }
        })
    }, action: function () {
        var a = this;
        a.checkFormalEnv() || (touch.on("body", "hold doubletap", function () {
        }), touch.on("body", "hold", function () {
        }), setTimeout(function () {
        }, 1e3)), $(".param-dialog").on("touchstart touchmove", function (e) {
            e.preventDefault()
        }), $("#shopping").on("tap", function () {
            location.href = "http://z.gionee.com/details-mobile/S6-Pro/index.html"
        }), $("#moreInfo").on("tap", function () {
            $(".param-dialog").addClass("shown")
        }), $("#freeMode").on("tap", function () {
            a.freeMode = 1
        }), $("#replay").on("tap", function () {
            location.href = "http://gionees6pro.wutaiwei.com/index.html"
        }), $("#closeBtn").on("tap", function () {
            $(".param-dialog").removeClass("shown")
        }), $(".main-container").on("touchstart", "canvas", function () {
            a.freeMode = 0, clearTimeout(a.waitForFree)
        }), $(".main-container").on("touchmove", "canvas", function () {
            clearTimeout(a.waitForFree)
        }), $(".main-container").on("touchend", "canvas", function () {
            a.waitForFree = setTimeout(function () {
                a.freeMode = 1
            }, 1500)
        }), $("#videoIndex2").on("tap", function () {
            $("#videoIndex2").width(a.w).height(a.w / 640 * 1040).show().get(0).play()
        }), $("#videoIndex3").on("tap", function () {
            $("#videoIndex3").width(a.w).height(a.w / 640 * 1040).show().get(0).play()
        }), $(".page-1").on("touchstart", function () {
            $(".video-container").show(), a.isAndriod(), $("#videoIndex1").width(a.w).height(a.w / 640 * 1040).show().get(0).play()
        }), $("#videoIndex1").on("play", function () {
            a.checkFormalEnv() || ($(this).get(0).currentTime = 100);
            var c = 0, h = $("#videoIndex1")[0].duration;
            h = 30 > h ? 100.5 : h;
            var g = setInterval(function () {
                c++;
                var w = $("#videoIndex1")[0].currentTime;
                w >= h - .5 && (!a.checkFormalEnv(), $(".video-container").remove(), a.modelAnimate(), clearInterval(g))
            }, 500);
            setTimeout(function () {
                $(".page-1").remove(), $(".page-2").addClass("shown")
            }, 1e3)
        }), Detector.webgl ? a.initScene() : (a.showImg(), $("#progressBar").width("100%"), setTimeout(function () {
            $("#videoIndex1").attr("src", "media/final-x5.mp4"), $(".loading-overlay").remove(), $(".page-1").addClass("shown"), $("#videoIndex1").get(0).load()
        }, 500), Detector.addGetWebGLMessage())
    }, initScene: function () {
        function a() {
            var a = window.innerWidth, c = window.innerHeight;
            h.renderer.setSize(a, c), h.mainCamera.aspect = a / c, h.mainCamera.updateProjectionMatrix()
        }

        function c(x, a, c, g, w) {
            var E = new THREE.DirectionalLight(g, w);
            E.position.set(x, a, c), h.scene.add(E), E.castShadow = !0;
            var d = 1;
            E.shadow.camera.left = -d, E.shadow.camera.right = d, E.shadow.camera.top = d, E.shadow.camera.bottom = -d, E.shadow.camera.near = 1, E.shadow.camera.far = 5, E.shadow.camera.width = 1e3, E.shadow.camera.height = 1e3, E.shadow.bias = -.005, E.shadow.barkness = .15
        }

        var h = this;
        if (h.isAndriod()) {
            h.modelContainer = $("#page2").get(0), h.mainCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 1e3), h.mainCamera.position.z = 2, h.renderer = new THREE.WebGLRenderer({antialias: !0});
            var g = h.isAndriod() ? window.devicePixelRatio : 2 * window.devicePixelRatio;
            h.renderer.setPixelRatio(g), h.renderer.setSize(window.innerWidth, window.innerHeight), h.modelContainer.appendChild(h.renderer.domElement), h.renderer.autoClear = !1, h.renderer.gammaInput = !0, h.renderer.gammaOutput = !0, h.renderer.toneMapping = THREE.ReinhardToneMapping, h.renderer.toneMappingExposure = 3, h.controls = new THREE.OrbitControls(h.mainCamera, h.renderer.domElement), h.controls.enabled = !0, h.controls.minDistance = 1.5, h.controls.maxDistance = 4, h.controls.rotateSpeed = .8, h.scene = new THREE.Scene, h.sceneCube = new THREE.Scene, h.cameraCube = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, .1, 1e4), h.sceneCube.add(h.cameraCube), h.isAndriod(), h.scene.add(new THREE.HemisphereLight(16777215, 2236979, 2)), c(20, 30, -25, 16777215, 1), c(80, 10, 35, 16777215, 1), c(20, -30, 35, 16777215, 1);
            var w = new THREE.LoadingManager;
            w.onProgress = function () {
            };
            var E = new THREE.CubeTextureLoader;
            E.setPath("images/");
            var v = E.load(["123.jpg", "123.jpg", "123.jpg", "123.jpg", "123.jpg", "123.jpg"]), T = THREE.ShaderLib.cube;
            T.uniforms.tCube.value = v;
            var M = new THREE.ShaderMaterial({
                fragmentShader: T.fragmentShader,
                vertexShader: T.vertexShader,
                uniforms: T.uniforms,
                depthWrite: !1,
                side: THREE.BackSide
            }), R = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), M);
            h.isAndriod() && (h.sceneCube.add(R), $(".page-2 .control-btn").addClass("and"));
            var b = new THREE.CubeTextureLoader;
            b.setPath("images/");
            var C = b.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]), y = "images/", H = new THREE.TextureLoader, S = H.load(y + "s6_maps.jpg"), E = (H.load(y + "M.jpg"), H.load(y + "timg.jpg"), new THREE.OBJLoader), _ = new THREE.MeshStandardMaterial({
                map: S,
                color: 14462078,
                shading: THREE.SmoothShading
            }), A = new THREE.MeshPhongMaterial({
                envMap: C,
                reflectivity: 1,
                refractionRatio: 1
            }), P = new THREE.MeshPhongMaterial, I = new THREE.MeshPhongMaterial({
                shininess: 0,
                reflectivity: 1,
                color: 16777215
            }), j = new THREE.MeshPhongMaterial({
                map: S,
                shininess: 0,
                reflectivity: 0,
                refractionRatio: 0,
                color: 16499084,
                shading: THREE.SmoothShading
            }), L = new THREE.MeshPhongMaterial({map: S, bumpScale: .6, color: 14462078, shading: THREE.SmoothShading});
            E.load("media/s6_0609_05.obj", function (a) {
                P.map = S, P.roughnessMap = S, P.metalnessMap = S, P.normalMap = S, I.map = S, A.transparent = !0, A.opacity = .1, a.children[0].material = j, a.children[1].material = A, a.children[2].material = _, a.children[3].material = j, a.children[4].material = j, a.children[5].material = P, a.children[6].material = _, a.children[7].material = _, a.children[8].material = j, a.rotation.x = -.02, a.rotation.y = Math.PI - .4, a.rotation.z = .05, a.position.x = .01, a.position.y = .1, a.scale.x = .007, a.scale.y = .007, a.scale.z = .007, console.log(a), h.phone = a, h.scene.add(a), $("#progressBar").width("100%"), setTimeout(function () {
                    $(".loading-overlay").remove(), $(".page-1").addClass("shown"), h.animate()
                }, 2e3)
            });
            var k = function (a, c) {
                return [a + "px" + c, a + "nx" + c, a + "py" + c, a + "ny" + c, a + "pz" + c, a + "nz" + c]
            }, z = k("images/", ".hdr");
            (new THREE.HDRCubeTextureLoader).load(THREE.UnsignedByteType, z, function (a) {
                var c = new THREE.PMREMGenerator(a);
                c.update(h.renderer);
                var g = new THREE.PMREMCubeUVPacker(c.cubeLods);
                g.update(h.renderer), hdrCubeRenderTarget = g.CubeUVRenderTarget, _.envMap = hdrCubeRenderTarget, _.needsUpdate = !0
            })
        } else {
            h.modelContainer = $("#page2").get(0), h.mainCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 1e3), h.mainCamera.position.z = 2, h.renderer = new THREE.WebGLRenderer({antialias: !0});
            var g = h.isAndriod() ? window.devicePixelRatio : 2 * window.devicePixelRatio;
            h.renderer.setPixelRatio(g), h.renderer.setSize(window.innerWidth, window.innerHeight), h.modelContainer.appendChild(h.renderer.domElement), h.renderer.autoClear = !1, h.renderer.gammaInput = !0, h.renderer.gammaOutput = !0, h.renderer.toneMapping = THREE.ReinhardToneMapping, h.renderer.toneMappingExposure = 3, h.controls = new THREE.OrbitControls(h.mainCamera, h.renderer.domElement), h.controls.enabled = !0, h.controls.minDistance = 1.5, h.controls.maxDistance = 4, h.controls.rotateSpeed = .8, h.scene = new THREE.Scene, h.sceneCube = new THREE.Scene, h.cameraCube = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, .1, 1e4), h.sceneCube.add(h.cameraCube), h.isAndriod(), h.scene.add(new THREE.HemisphereLight(16777215, 2236979, 1)), c(20, 30, -25, 16777215, 1), c(80, 10, 35, 16777215, 1), c(20, -30, 35, 16777215, 1), c(10, -10, 15, 16777215, 1), c(-10, -20, -15, 16777215, 1), c(1, -3, 5, 16777215, 1), c(-10, 10, -15, 16777215, 1), c(-10, 20, 15, 16777215, 1), c(-1, -3, -5, 16777215, 1), c(20, 20, 25, 16777215, 1), c(0, 0, 15, 16777215, 1), c(1, -3, 0, 16777215, 1), c(30, -30, 35, 16777215, 1), c(-120, -220, -115, 16777215, 1), c(1, -3, 5, 16777215, 1);
            var w = new THREE.LoadingManager;
            w.onProgress = function () {
            };
            var E = new THREE.CubeTextureLoader;
            E.setPath("images/");
            var v = E.load(["123.jpg", "123.jpg", "123.jpg", "123.jpg", "123.jpg", "123.jpg"]), T = THREE.ShaderLib.cube;
            T.uniforms.tCube.value = v;
            var M = new THREE.ShaderMaterial({
                fragmentShader: T.fragmentShader,
                vertexShader: T.vertexShader,
                uniforms: T.uniforms,
                depthWrite: !1,
                side: THREE.BackSide
            }), R = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), M);
            h.isAndriod() && (h.sceneCube.add(R), $(".page-2 .control-btn").addClass("and"));
            var b = new THREE.CubeTextureLoader;
            b.setPath("images/");
            var C = b.load(["px.png", "px.png", "py.png", "py.png", "nz.png", "nz.png"]), y = "images/", H = new THREE.TextureLoader, S = H.load(y + "s6_maps.jpg"), E = (H.load(y + "M.jpg"), H.load(y + "timg.jpg"), new THREE.OBJLoader), _ = new THREE.MeshStandardMaterial({
                map: S,
                bumpScale: 0,
                color: 15790320,
                reflectivity: 1,
                metalness: .5,
                roughness: .2,
                shading: THREE.SmoothShading
            }), A = new THREE.MeshPhongMaterial({
                envMap: C,
                reflectivity: 1,
                refractionRatio: 1
            }), P = new THREE.MeshPhongMaterial({
                shininess: 0,
                emissive: 0,
                specular: 0
            }), I = new THREE.MeshStandardMaterial({
                metalness: .8,
                roughness: .2
            }), j = new THREE.MeshStandardMaterial({
                map: S,
                reflectivity: 0,
                refractionRatio: 0,
                shininess: 0,
                color: 16761226,
                shading: THREE.SmoothShading
            }), L = new THREE.MeshStandardMaterial({
                map: S,
                metal: !0,
                metalness: 1,
                roughness: .2,
                reflectivity: .1,
                refractionRatio: 1,
                envMap: C,
                shading: THREE.SmoothShading
            }), W = new THREE.MeshPhongMaterial({map: S, shininess: 0, color: 15582367, emissive: 0, specular: 0});
            E.load("media/s6_0612_.obj", function (a) {
                P.map = S, I.map = S, A.transparent = !0, A.opacity = .1, a.children[0].material = j, a.children[1].material = A, a.children[2].material = _, a.children[3].material = P, a.children[4].material = j, a.children[5].material = W, a.children[6].material = I, a.children[7].material = _, a.children[8].material = j, a.children[9].material = L, a.rotation.x = -.02, a.rotation.y = Math.PI - .4, a.rotation.z = .05, a.position.x = .01, a.position.y = .1, a.scale.x = .007, a.scale.y = .007, a.scale.z = .007, console.log(a), h.phone = a, h.scene.add(a), $("#progressBar").width("100%"), setTimeout(function () {
                    $(".loading-overlay").remove(), $(".page-1").addClass("shown"), +h.animate()
                }, 2e3)
            })
        }
        h.renderer.toneMappingExposure = Math.pow(h.isAndriod() ? 1.3 : 1, 4), h.statsEnabled && (h.stats = new Stats, h.modelContainer.appendChild(h.stats.dom)), window.addEventListener("resize", a, !1);
        var B = h.isAndriod() ? .014 : .007;
        h.animate = function () {
            if (requestAnimationFrame(h.animate), h.controls.update(), 1 == h.freeMode)h.phone.rotation.y += B; else if (2 == h.freeMode) {
                var a = 5e-4 * Date.now();
                h.mainCamera.position.x = .01 * Math.sin(a), h.mainCamera.position.y = .01 * Math.sin(a), h.mainCamera.position.z = .02 * Math.cos(a), h.mainCamera.lookAt(new THREE.Vector3(0, 0, 0))
            }
            h.renderer.render(h.sceneCube, h.cameraCube), h.renderer.render(h.scene, h.mainCamera), h.statsEnabled && h.stats.update()
        }, h.modelAnimate = function () {
            TweenMax.to(h.phone.position, 2, {
                x: .03, y: .15, z: 0, ease: Expo.easeInOut, onComplete: function () {
                    h.freeMode = 1
                }
            }), TweenMax.to(h.phone.rotation, 2, {
                x: 0, y: Math.PI, z: 0, ease: Expo.easeInOut, onComplete: function () {
                    h.freeMode = 1
                }
            }), TweenMax.to(h.phone.scale, 2, {
                x: .007, y: .007, z: .007, ease: Expo.easeInOut, onComplete: function () {
                    h.freeMode = 1
                }
            })
        }
    }, showImg: function () {
        var a = this, c = a.w, h = a.w / 640 * 1040, g = '<div id="threesixty" class="show-phone-img"></div>';
        $("#page2").append(g), $("#threesixty").spritespin({
            source: SpriteSpin.sourceArray("images/phone/{frame}.png", {
                frame: [1, 37],
                digits: 0
            }),
            width: 2 * c,
            height: 2 * h,
            sense: 1,
            mods: ["move", "360"],
            behavior: null,
            module: null,
            animate: !1,
            wrap: !1
        }), $("#threesixty").css({height: h, width: c})
    }, initWeChatShare: function () {
        var a = "http://gionees6pro.wutaiwei.com/index.html", c = "手机史上第一个朋友圈发布会", h = "金立S6 Pro就耀快发布会", g = "http://gionees6pro.wutaiwei.com/icon.jpg";
        $.ajax({
            type: "get",
            url: "http://www.qiween.com/wxapi/api/jsconfig?url=" + encodeURIComponent(window.location.href),
            async: !0,
            dataType: "json",
            success: function (a) {
                0 == a.ret ? wx.config({
                    debug: !1,
                    appId: a.appId,
                    timestamp: a.timestamp,
                    nonceStr: a.nonceStr,
                    signature: a.signature,
                    jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
                }) : alert("js授权失败：" + a.msg)
            }
        }), wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: h, desc: c, link: a + "?friend=1", imgUrl: g, success: function () {
                    _hmt.push(["_trackEvent", "发给朋友", "发给朋友success"])
                }, cancel: function () {
                    _hmt.push(["_trackEvent", "发给朋友", "发给朋友cancel"])
                }, fail: function () {
                    _hmt.push(["_trackEvent", "发给朋友", "发给朋友fail"])
                }
            }), wx.onMenuShareTimeline({
                title: c, link: a + "?timeline=1", imgUrl: g, success: function () {
                    _hmt.push(["_trackEvent", "分享到朋友圈", "分享到朋友圈success"])
                }, cancel: function () {
                    _hmt.push(["_trackEvent", "分享到朋友圈", "分享到朋友圈cancel"])
                }, fail: function () {
                    _hmt.push(["_trackEvent", "分享到朋友圈", "分享到朋友圈fail"])
                }
            })
        })
    }, loadMusic: function () {
        var a = this, c = {preload: "auto", loop: "loop"};
        a.bgAudio = new Audio, a.bgAudio.src = "media/bg.mp3";
        for (var h in c)c.hasOwnProperty(h) && h in a.bgAudio && (a.bgAudio[h] = c[h]);
        a.bgAudio.play(), $(".musicBtn").on("tap", function () {
            $(this).hasClass("musicPause") ? ($(this).removeClass("musicPause"), a.bgAudio.play()) : ($(this).addClass("musicPause"), a.bgAudio.pause())
        })
    }, rebuildJqAjax: function (a, c, h, g) {
        var w = this;
        w.checkFormalEnv() || (c._nb_openid_1 = "123"), $.ajax({
            url: w.path.product + a,
            data: c,
            async: g,
            dataType: "json",
            type: "GET",
            timeout: 9e4,
            success: function (re) {
                console.log(a + " 接口请求成功"), h.done && h.done(re)
            },
            error: function (re) {
                console.log(a + " 接口报错"), h.fail && h.fail(re)
            },
            complete: function (re) {
                h.always && h.always(re)
            }
        })
    }, checkFormalEnv: function () {
        var a = this;
        return window.location.href.toLowerCase().indexOf(a.formalURL) > -1 ? !0 : !1
    }, getQueryString: function (a) {
        var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"), r = window.location.search.substr(1).match(c);
        return null != r ? unescape(r[2]) : null
    }, isAndriod: function () {
        var a = navigator.userAgent;
        return a.indexOf("Android") > -1 || a.indexOf("Adr") > -1 ? !0 : !1
    }, orientation: function () {
        function a() {
            (180 == window.orientation || 0 == window.orientation) && document.getElementById("mask").setAttribute("class", "hide mask"), (90 == window.orientation || -90 == window.orientation) && document.getElementById("mask").setAttribute("class", "show mask")
        }

        var c = '<div class="mask hide" id="mask"><div class="mask-box"><div class="mask-pic"><i></i></div><div class="msg">请将手机竖置浏览</div></div></div>';
        $("body").append(c), window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", a, !1)
    }
};
var _App = new _App;
_App.init();