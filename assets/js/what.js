(() => { LOADJS = { fire: function(b, a, d) { var c = callPageJS;
            a = a === void 0 ? "init" : a, b !== "" && c[b] && typeof c[b][a] == "function" && c[b][a](d) }, loadEvents: function() { var a = document.querySelector(".hide"),
                b = a.id;
            LOADJS.fire("common"), LOADJS.fire(b) } }, $(document).ready(LOADJS.loadEvents), callPageJS = { common: { init: function() { var n = document.querySelector("nav.home"),
                    a = $("#hamburger"),
                    b, d, h, m, f, g, i, c, l, j;
                a.on("click", function(b) { $("nav").addClass("active"), $(".bar").addClass("active"), $("#side_menu_wrapper").fadeIn(300).addClass("active"), $("body").addClass("locked"), b.stopPropagation(), a.hasClass("active") ? ($("nav").removeClass("active"), a.removeClass("active"), $(".bar").removeClass("active"), $("#side_menu_wrapper").fadeOut(300).removeClass("active"), $("body").removeClass("locked")) : a.addClass("active") }), b = $("nav"), d = window.innerWidth, h = window.innerHeight, m = b.height(), f = document.createElement("div"), $(window).on("scroll", function() {!b.hasClass("home") && d < 800 && (document.body.scrollTop > 100 | document.documentElement.scrollTop > 100 ? (f.style.height = "55px", $("body").prepend(f), b.addClass("scroll"), gsap.to(b, .5, { backgroundColor: "#ffffff" })) : (f.remove(), b.removeClass("scroll"), gsap.to(b, .5, { backgroundColor: "transparent" }))) }), $("button").on("click", function(a) { a.stopPropagation, $(this).addClass("btnActive"), $("button").not($(this)).removeClass("btnActive") }), $(".menu_links li:last-child").addClass("last"), c = window.innerHeight, d = window.innerWidth;

                function k(b) { b.removeAttribute("style"); var a = getComputedStyle(b),
                        c = parseInt(a.height),
                        d = parseInt(a.paddingTop) + parseInt(a.paddingBottom) + parseInt(a.marginTop) + parseInt(a.marginBottom); return g = c - d, g } e();

                function e() { for (var b = document.getElementsByClassName("viewportFixed"), a = 0; a < b.length; a++) k(b[a]), i = c - g, calculatedWindowHeight = c - i, b[a].removeAttribute("style"), b[a].style.height = calculatedWindowHeight + "px" } l = "onorientationchange" in window, j = l ? "orientationchange" : "resize", window.addEventListener(j, function() { c = window.innerHeight, e() }, !1), $(window).resize(function() { var f = window.innerWidth,
                        b = window.innerHeight;
                    f != d && b != h && (console.log("resized"), c = window.innerHeight, e()), a.hasClass("active") && b != h && a.trigger("click") }) } }, index: { init: function() { for (var e = document.getElementsByClassName("project"), p = e.length, c = 0, o, h, a, m, d, i, j, k, s, f, n, g, b, r, l, q, t; c < p; c++) o = parseInt([c], 10), h = o + 1, h == 1 ? e[c].setAttribute("href", "/gallery/") : e[c].setAttribute("href", "/gallery/page/" + h + "/");
                a = $(".overlay"), m = $(".filter_xit"), d = $(".tag"), i = $(".material_tag"), j = $(".process_tag"), k = $(".year_tag"), s = $("#filter_menu"), f = $(".all"), n = $(".filter_option"), g = $(".tag"), b = document.getElementsByClassName("project"), r = b.length, n.on("click", function() {
                    function b() { a.hasClass("active") || (a.fadeIn(300).addClass("active"), a.css({ borderBottom: "solid 1px black", borderTop: "solid 1px black" })) } $(this).hasClass("material") ? (d.not(i).css("display", "none"), i.fadeIn(300), b()) : $(this).hasClass("process") ? (d.not(j).css("display", "none"), j.fadeIn(300), b()) : $(this).hasClass("year") ? (d.not(k).css("display", "none"), k.fadeIn(300), b()) : (f.fadeOut(300).removeClass("active"), $(".project").addClass("filtered")) }), m.on("click", function() { a.hasClass("active") && (a.fadeOut(300).removeClass("active"), a.css({ borderBottom: "unset", borderTop: "unset" }), d.fadeOut(300), $(".project").addClass("filtered"), f.fadeOut(300).removeClass("active")) }), g.on("click", function(e) { var c, a, d;
                    f.fadeIn(300).addClass("active"), c = $(this).attr("data-filter"); for (a = 0; a < b.length; a++) d = b[a].getAttribute("data-filter"), d.includes(c) ? b[a].classList.add("filtered") : b[a].classList.remove("filtered") }), window.location.hash && (l = window.location.hash, q = l.replace("#", ""), g.each(function() { $(this).hasClass(q) && $(this).trigger("click"), history.replaceState(null, null, " ") })) } }, gallery: { init: function() { var v = document.querySelector(".right_justified_partial"),
                    n = window.innerWidth,
                    Q = window.innerHeight,
                    b = document.querySelector("#slide_container"),
                    r = document.querySelector("#main_slide"),
                    A = r.getAttribute("data-url"),
                    F = r.innerHTML,
                    f = document.querySelector("#arrow_left"),
                    c = document.querySelector("#arrow_right"),
                    q = document.querySelector(".project_slide"),
                    y = q.id.replace(/ +/g, "-").toLowerCase(),
                    l = q.getAttribute("data-total"),
                    O = window.location.pathname,
                    o = !1,
                    D = !1,
                    u = function(b, a) { a.load(), a.oncanplay = function() { a.play(), b.classList.remove("loadingImg") } },
                    w = function(f) { var d = f.getElementsByClassName("thumbnail"),
                            k = f.getElementsByClassName("temp"),
                            c, a, h, b, j, e, g, i; for (c = 0; c < d.length; c++)
                            if (a = d[c], h = a.getAttribute("data-url"), b = document.createElement("img"), b.classList.add("hide", "temp"), document.querySelector(".thumbnails").appendChild(b).style.display = "none", a.classList.contains("video")) e = a.querySelector("video"), g = e.querySelector("source"), i = g.getAttribute("data-url"), g.setAttribute("src", i), u(a, e);
                            else { let c = function(b, a) { a.onload = function() { var c = a.src;
                                        a.remove(), b.style.backgroundImage = "url(" + c + ")", b.classList.remove("loadingImg") } };
                                j = c, b.src = h, c(a, b) } },
                    M = function() { $.ajax({ url: k, dataType: "text", success: function(m) { var n = $.parseHTML(m),
                                    h = $("<div>").append(n),
                                    p, a, d, b, e, g, j, o, i;
                                h.find("link").remove(), tempHtml = h.html(), a = document.createElement("div"), document.querySelector("body").appendChild(a).style.display = "none", a.innerHTML = tempHtml, d = a.querySelector("#arrow_left"), b = a.querySelector("#arrow_right"), j = a.querySelector(".right_justified_partial").innerHTML, o = a.querySelector(".project_slide").id, i = o.replace(/ +/g, "-").toLowerCase(), d && b ? (e = d.getAttribute("href"), g = b.getAttribute("href"), f.setAttribute("href", e), c.setAttribute("href", g)) : d == void 0 && b ? (g = b.getAttribute("href"), f.setAttribute("href", "/gallery/page/" + l + "/"), c.setAttribute("href", g)) : b == void 0 && d && (e = d.getAttribute("href"), c.setAttribute("href", "/gallery/"), f.setAttribute("href", e)), v.innerHTML = j, q.id = i, w(v), a.remove(), window.history.pushState && window.history.pushState(null, null, k + "#" + i) } }) },
                    p = function(a, b) { $.ajax({ url: b, dataType: "text", success: function(e) { var f = $.parseHTML(e),
                                    d = $("<div>").append(f),
                                    i, b, c, g, h;
                                d.find("link").remove(), tempHtml = d.html(), b = document.createElement("div"), document.querySelector("body").appendChild(b).style.display = "none", b.innerHTML = tempHtml, c = b.querySelector("#main_slide"), c.classList.contains("video") ? (h = c.innerHTML, a.innerHTML = h, a.classList.add("video", "loadingImg"), a.querySelector("video").pause()) : (g = c.getAttribute("data-url"), a.style.backgroundImage = 'url("' + g + '")'), b.remove() } }) },
                    C = "<a id='arrow_left' href='/gallery/page/" + l + "/' class='menu_item icon left arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>",
                    I = "<a id='arrow_right' href='/gallery/' class='menu_item icon right arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>",
                    d = document.createElement("div"),
                    a = document.createElement("div"),
                    e = document.createElement("div"),
                    z = a.offsetLeft,
                    H = (n / (z - n) * 100 - 10).toString() + "%",
                    L = (n / (z + n) * 100 + 10).toString() + "%",
                    g, s, N, P, h, i, j, k, x;
                d.style.left = H, e.style.left = L;

                function J() { b.appendChild(d).classList.add("slide"), r.classList.contains("video") ? (b.appendChild(a).classList.add("slide", "video"), a.innerHTML = F, D = !0) : (b.appendChild(a).classList.add("slide"), a.style.backgroundImage = 'url("' + A + '")'), b.appendChild(e).classList.add("slide") } K();

                function K() { while (b.firstChild) b.removeChild(b.firstChild);
                    J(); var a = document.querySelector(".right_justified_partial");
                    w(a), q.id = y, window.history.pushState && window.history.pushState(null, null, "#" + y), t(), o = !0 }

                function G() { var a, b;
                    f && c ? (h = f.getAttribute("href"), g = c.getAttribute("href")) : f !== void 0 && c == void 0 ? (a = document.createElement("a"), document.querySelector("#directional_arrows").appendChild(a), a.outerHTML = I, c = a, h = f.getAttribute("href"), g = "/gallery/") : f == void 0 && c !== void 0 && (b = document.createElement("a"), document.querySelector("#directional_arrows").appendChild(b), b.outerHTML = C, f = b, h = "/gallery/page/" + l + "/", g = c.getAttribute("href")) } $("body").on("click", ".arrow", function(a) { a.preventDefault(), a.stopPropagation(), b.classList.contains("animating") || ($(this).hasClass("left") ? s = "prev" : s = "next", o = !1, k = $(this).prop("href"), t(s, k), f = document.querySelector("#arrow_left"), c = document.querySelector("#arrow_right")) });

                function t(c, f) { var m, n, k, q, r, l; if (G(), o == !1 && c && f)
                        if (M(f), c == "prev") { let c = function() { if (e.remove(), e = a, a = d, d = document.createElement("div"), d.style.left = "-110%", b.insertBefore(d, a).classList.add("slide"), b.classList.remove("animating"), a.classList.contains("video")) { var c = a.querySelector("video");
                                    u(a, c) } E() };
                            m = c, n = gsap.to(a, { duration: .5, left: "110%" }), k = gsap.to(d, { duration: .5, left: "0%", onComplete: c }), k.isActive() || b.classList.add("animating") } else { let c = function() { if (d.remove(), d = a, a = e, e = document.createElement("div"), e.style.left = "110%", a.parentNode.insertBefore(e, a.nextElementSibling).classList.add("slide"), b.classList.remove("animating"), a.classList.contains("video")) { var c = a.querySelector("video");
                                    u(a, c) } B() };
                            q = c, r = gsap.to(a, { duration: .5, left: "-110%" }), l = gsap.to(e, { duration: .5, left: "0%", onComplete: c }), l.isActive() || b.classList.add("animating") } else h && (i = d, j = h, p(i, j)), g && (i = e, j = g, p(i, j)) }

                function E() { var c, e, b, a, f = l - 1;
                    h == null ? a = "/gallery/page/" + f + "/" : h.match(/\d+/) == void 0 ? a = "/gallery/page/" + l + "/" : (c = h.match(/\d+/), e = parseInt(c, 10), b = e - 1, b <= 1 ? a = "/gallery/" : a = "/gallery/page/" + b + "/"), j = a, i = d, p(i, j) }

                function B() { var c, d, b, a;
                    g == null ? a = "/gallery/page/2/" : g.match(/\d+/) == null ? a = "/gallery/page/2/" : (c = g.match(/\d+/), d = parseInt(c, 10), b = d + 1, b > l ? a = "/gallery/" : a = "/gallery/page/" + b + "/"), i = e, j = a, p(i, j) } $(document).keydown(function(a) { switch (a.which) {
                        case 37:
                            a.preventDefault(), m("prev"); break;
                        case 39:
                            a.preventDefault(), m("next"); break } }), x = new Hammer(b), x.on("swipeleft", function(a) { a.preventDefault, m("next") }), x.on("swiperight", function(a) { a.preventDefault, m("prev") });

                function m(a) { b.classList.contains("animating") || (o = !1, a == "prev" ? k = $("#arrow_left").prop("href") : k = $("#arrow_right").prop("href"), t(a, k), f = document.querySelector("#arrow_left"), c = document.querySelector("#arrow_right")) } $("body").on("click", ".thumbnail", function() { var f, d, c, e; if (!b.classList.contains("animating")) { let b = function() { console.log(c), c == !1 ? (a.innerHTML = "", a.style.backgroundImage = "url(" + d + ")") : c == !0 && (a.innerHTML = e, a.style.backgroundImage = ""), gsap.to(a, { duration: .25, autoAlpha: "1" }) };
                        f = b, d = $(this).attr("data-url"), c = $(this).hasClass("video"), e = $(this).html(), gsap.to(a, { duration: .25, autoAlpha: "0", onComplete: b }) } }) } } } })()