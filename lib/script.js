var searchFromBox = false;
function gSearch(el) {
    var cx = uic_r_y();
    var gcse = document.createElement('script'); gcse.id = 'gSearch'; gcse.type = 'text/javascript'; gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var el = document.getElementById('gSearch');
    if (el == null) {
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
    }
    open_search(el, searchFromBox);
};

function click_learntocode_search_btn() {
    var x = document.getElementsByClassName("search_item");
    if (x.length == 0) {
        cc = 1;
    }
    for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf("search_active") > -1) {
            n = x[i].href;
            if (n.indexOf("search_entire_w3schools") > -1) {
                cc = 1;
            }
            break;
        }
    }
    if (cc == 1) {
        searchFromBox = true;
        submit_search_form();
    } else {
        window.location = n;
    }
}

function find_search_results(inp) {
    var a, val, i, l, resultIndexes = [], resultTexts = [], html = "", classAtt = "", pos1, posNext, cc, c0, c1, c2;
    a = document.getElementById("listofsearchresults");
    a.innerHTML = "";
    a.style.display = "none";
    document.getElementById("search2").style.borderBottomLeftRadius = "25px";
    val = inp.value.toUpperCase();
    if (val == "") return false;
    for (i = 0; i < pagesArr.length; i++) {
        if (pagesArr[i][0].toUpperCase().substr(0, val.length) == val || pagesArr[i][2].toUpperCase().substr(0, val.length) == val) {
            if (resultTexts.indexOf(pagesArr[i][2]) == -1) {
                resultIndexes.push(i);
                resultTexts.push(pagesArr[i][2]);
                if (resultIndexes.length > 5) break;
            }
        }
    }
    for (i = 0; i < pagesArr.length; i++) {
        if (resultIndexes.indexOf(i) == -1 && (pagesArr[i][0].toUpperCase().indexOf(val) > -1 || pagesArr[i][2].toUpperCase().indexOf(val) > -1)) {
            if (resultTexts.indexOf(pagesArr[i][2]) == -1) {
                resultIndexes.push(i);
                resultTexts.push(pagesArr[i][2]);
                if (resultIndexes.length > 5) break;
            }
        }
    }
    document.getElementById("search2").style.borderBottomLeftRadius = "0";
    a.style.display = "block";
    for (i = 0; i < resultIndexes.length; i++) {
        cc = pagesArr[resultIndexes[i]][2];
        pos1 = cc.toUpperCase().indexOf(val);
        dd = "";
        while (pos1 > -1) {
            c0 = cc.substr(0, pos1);
            c1 = "<span class='span_search'>" + cc.substr(pos1, val.length) + "</span>";
            c2 = cc.substr(pos1 + val.length);
            dd += c0 + c1;
            posNext = c2.toUpperCase().indexOf(val);
            if (posNext > -1) {
                cc = c2;
                pos1 = posNext;
            } else {
                cc = dd + c2;
                pos1 = -1;
            }
        }
        classAtt = "";
        if (html == "") classAtt = " search_active";
        html += "<a class='search_item" + classAtt + "' href='" + pagesArr[resultIndexes[i]][1] + "'>" + cc + "</a>";
    }
    if (resultIndexes.length == 0) {
        classAtt = "";
        if (html == "") classAtt = " search_active";
        html += "<a class='search_item" + classAtt + "' onclick='click_search_w3schools_link(event)' href='search_entire_w3schools'>Search W3Schools</a>";
    }
    a.innerHTML = html;
}

function click_search_w3schools_link(event) {
    event.preventDefault();
    submit_search_form();
}

function key_pressed_in_search(event) {
    var x, n, nn, i, cc = 0;
    var keycode = event.keyCode;
    if (keycode == 38 || keycode == 40) {
        x = document.getElementsByClassName("search_item");
        for (i = 0; i < x.length; i++) {
            if (x[i].className.indexOf("search_active") > -1) {
                x[i].className = "search_item";
                n = i;
                break;
            }
        }
        if (keycode == 38) {
            nn = n - 1;
            if (nn < 0) nn = 0;
        }
        if (keycode == 40) {
            nn = n + 1;
            if (nn >= x.length) nn = nn - 1;
        }
        x[nn].className = "search_item search_active";
    }
    if (keycode == 13) {  //enter
        event.preventDefault();
        x = document.getElementsByClassName("search_item");
        if (x.length == 0) {
            cc = 1;
        }
        for (i = 0; i < x.length; i++) {
            if (x[i].className.indexOf("search_active") > -1) {
                n = x[i].href;
                if (n.indexOf("search_entire_w3schools") > -1) {
                    cc = 1;
                }
                break;
            }
        }
        if (cc == 1) {
            searchFromBox = true;
            submit_search_form();
        } else {
            window.location = n;
        }
    }
}

function submit_search_form() {
    searchFromBox = true;
    gSearch();
    var delayInMilliseconds = 100; //0.1 second
    setTimeout(execute_google_search, delayInMilliseconds);
}

function execute_google_search() {
    if (typeof google == 'object') {
        google.search.cse.element.getElement("standard0").execute(document.getElementById("search2").value);
    } else {
        setTimeout(execute_google_search, 100);
    }
}

function mouseoverdarkicon() {
    var a = document.getElementById("darkmodemenu");
    a.style.top = "48px";
    a.style.zIndex = "1";
}

function mouseoutofdarkicon() {
    var a = document.getElementById("darkmodemenu");
    a.style.top = "35px";
    a.style.zIndex = "-1";
}

function changepagetheme(n) {
    var a = document.getElementById("radio_darkcode");
    var b = document.getElementById("radio_darkpage");
    document.body.className = document.body.className.replace("darktheme", "");
    document.body.className = document.body.className.replace("darkpagetheme", "");
    document.body.className = document.body.className.replace("  ", " ");
    if (a.checked && b.checked) {
        localStorage.setItem("preferredmode", "light");
        localStorage.setItem("preferredpagemode", "light");
        a.checked = false;
        b.checked = false;
        document.getElementById("wavepath").style.fill = "#282A35";
    } else {
        document.body.className += " darktheme";
        document.body.className += " darkpagetheme";
        localStorage.setItem("preferredmode", "dark");
        localStorage.setItem("preferredpagemode", "dark");
        a.checked = true;
        b.checked = true;
        document.getElementById("wavepath").style.fill = "rgb(13,23,33)";
    }
}

function click_darkpage() {
    var b = document.getElementById("radio_darkpage");
    if (b.checked) {
        document.body.className += " darkpagetheme";
        document.body.className = document.body.className.replace("  ", " ");
        localStorage.setItem("preferredpagemode", "dark");
        document.getElementById("wavepath").style.fill = "rgb(13,23,33)";

    } else {
        document.body.className = document.body.className.replace("darkpagetheme", "");
        document.body.className = document.body.className.replace("  ", " ");
        localStorage.setItem("preferredpagemode", "light");
        document.getElementById("wavepath").style.fill = "#282A35";
    }
}

function click_darkcode() {
    var a = document.getElementById("radio_darkcode");
    if (a.checked) {
        document.body.className += " darktheme";
        document.body.className = document.body.className.replace("  ", " ");
        localStorage.setItem("preferredmode", "dark");
    } else {
        document.body.className = document.body.className.replace("darktheme", "");
        document.body.className = document.body.className.replace("  ", " ");
        localStorage.setItem("preferredmode", "light");
    }
}

function changecodetheme() {
    var cc = document.body.className;
    if (cc.indexOf("darktheme") > -1) {
        document.body.className = cc.replace("darktheme", "");
        localStorage.setItem("preferredmode", "light");
    } else {
        document.body.className += " darktheme";
        localStorage.setItem("preferredmode", "dark");
    }
}

function open_search(elmnt, sfb) {
    var a = document.getElementById("googleSearch");
    if (a.style.visibility == "hidden" && a.style.display == "") {
        a.style.visibility = "";
        a.style.display = "none";
    }
    if (sfb == false) {
        if (a.style.display == "") {
            a.style.visibility = "";
            a.style.display = "none";   
        } else {
            a.style.display = "";
            a.style.visibility == "hidden"
            if (window.innerWidth > 1000) {
                a.style.width = "50%";
            } else if (window.innerWidth > 768) {
                a.style.width = "80%";
            } else {
                a.style.width = "80%";
            }
            window.setTimeout(function () {
                if (document.getElementById("gsc-i-id1")) {
                    document.getElementById("gsc-i-id1").focus();
                }
            }, 400);
        }
    } else {
        if (a.style.display == "") {
            a.style.visibility = "";
            a.style.display = "none";
        } else {
            a.style.display = "";
            a.style.visibility == "hidden"
        }
        a.style.visibility = "hidden";
        a.style.display = "";
    }
}