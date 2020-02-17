// let domColorSelector = document.querySelector("#color-selector");
let domRoot = document.documentElement;
let domSliderHue = document.querySelector("#slider-hue");
let domSliderSat = document.querySelector("#slider-sat");
let domSliderLtn = document.querySelector("#slider-ltn");
let domInputH100 = document.querySelector("#H100 input");
let domInputS100 = document.querySelector("#S100 input");
let domInputL100 = document.querySelector("#L100 input");
let domInputH500 = document.querySelector("#H500 input");
let domInputS500 = document.querySelector("#S500 input");
let domInputL500 = document.querySelector("#L500 input");
let domInputH900 = document.querySelector("#H900 input");
let domInputS900 = document.querySelector("#S900 input");
let domInputL900 = document.querySelector("#L900 input");
let domCheckboxProMode = document.querySelector("#pro-mode");

let currSliderShade = 500;
let proMode = true;

var color = {
    shade: 0,
    color: function(newHue, newSat, newLtn) {
        this.hue = newHue;
        this.sat = newSat;
        this.ltn = newLtn;
    },
    updateGrid: function() {
        document.querySelector("#grid span.C" + this.shade).style.left = "calc(" + this.l + "% - var(--radius))";
        document.querySelector("#grid span.C" + this.shade).style.bottom = "calc(" + this.s + "% - var(--radius))";
    },
    h: 0,
    set hue(newHue) {
        this.h = newHue;
        domRoot.style.setProperty('--hue' + this.shade, this.h);
        if(this.shade == currSliderShade) {
            if(domSliderHue !== document.activeElement) {
                domSliderHue.value = this.h;
            }
            domRoot.style.setProperty('--hueSlider', this.h);
        }
        let input = document.querySelector("#H" + this.shade + " input");
        if(input !== null) {
            input.value=this.h;
        }
        // console.log("New Hue " + this.shade + ": " + this.h);
    },
    s: 100,
    set sat(newSat) {
        this.s = newSat;
        domRoot.style.setProperty('--sat' + this.shade, this.s + "%");
        if(this.shade == currSliderShade) {
            if(domSliderSat !== document.activeElement) {
                domSliderSat.value = this.s;
            }
            domRoot.style.setProperty('--satSlider', this.s + "%");
        }
        let input = document.querySelector("#S" + this.shade + " input");
        if(input !== null) {
            input.value=this.s;
        }
        this.updateGrid();
    },
    l: 50,
    set ltn(newLtn) {
        this.l = newLtn;
        domRoot.style.setProperty('--ltn' + this.shade, this.l + "%");
        if(this.shade == currSliderShade) {
            if(domSliderLtn !== document.activeElement) {
                domSliderLtn.value = this.l;
            }
            domRoot.style.setProperty('--ltnSlider', this.l + "%");
        }
        let input = document.querySelector("#L" + this.shade + " input");
        if(input !== null) {
            input.value=this.l;
        }
        this.updateGrid();
    },
}
var color100 = Object.create(color);
color100.shade = 100;
var color200 = Object.create(color);
color200.shade = 200;
var color300 = Object.create(color);
color300.shade = 300;
var color400 = Object.create(color);
color400.shade = 400;
var color500 = Object.create(color);
color500.shade = 500;
var color600 = Object.create(color);
color600.shade = 600;
var color700 = Object.create(color);
color700.shade = 700;
var color800 = Object.create(color);
color800.shade = 800;
var color900 = Object.create(color);
color900.shade = 900;

recalcColors = function() {
    h500 = parseFloat(document.querySelector("#H500 input").value);
    s500 = parseFloat(document.querySelector("#S500 input").value);
    l500 = parseFloat(document.querySelector("#L500 input").value);
    if(proMode) {
        h100 = parseFloat(document.querySelector("#H100 input").value);
        s100 = parseFloat(document.querySelector("#S100 input").value);
        l100 = parseFloat(document.querySelector("#L100 input").value);
        h900 = parseFloat(document.querySelector("#H900 input").value);
        s900 = parseFloat(document.querySelector("#S900 input").value);
        l900 = parseFloat(document.querySelector("#L900 input").value);
        hues = recalcHue(h500, h100, h900);
        sats = recalcSat(s500, s100, s900);
        ltns = recalcLtn(l500, l100, l900);
    } else {
        hues = recalcHue(h500);
        sats = recalcSat(s500);
        ltns = recalcLtn(l500);
    }
    color100.color(hues[0], sats[0], ltns[0]);
    color200.color(hues[1], sats[1], ltns[1]);
    color300.color(hues[2], sats[2], ltns[2]);
    color400.color(hues[3], sats[3], ltns[3]);
    color500.color(hues[4], sats[4], ltns[4]);
    color600.color(hues[5], sats[5], ltns[5]);
    color700.color(hues[6], sats[6], ltns[6]);
    color800.color(hues[7], sats[7], ltns[7]);
    color900.color(hues[8], sats[8], ltns[8]);
};
recalcHue = function(h500, h100 = null, h900 = null) {
    if(h900 == null) {
        h100 = Math.max(0, Math.min(h500-15, Math.round(0.97 * h500)));
        h900 = Math.min(360, Math.max(h500+10, Math.round(1.03 * h500)));
    }

    return recalcValue(h100, h500, h900, 1, 2, 3);
}

recalcSat = function(s500, s100 = null, s900 = null) {
    if(s900 == null) {
        s100 = Math.max(s500, Math.min(90, 3 * s500));
        s900 = Math.min(s500, Math.max(30, 0.2*s500));
    }

    return recalcValue(s100, s500, s900, 0.5, 1.5, 2.8);
};

recalcLtn = function(l500, l100 = null, l900 = null) {
    if(l900 == null) {
        l100 = Math.max(l500, Math.min(95, 3 * l500));
        l900 = Math.min(l500, Math.max(10, 0.2*l500));
    }

    return recalcValue(l100, l500, l900, 1.2, 2.4, 3.4);
};

/**
 * 
 */
recalcValue = function(v100, v500, v900, factor1, factor2, factor3) {
    let v = [];

    v[0] = v100;
    v[1] = (v500 - (v500 - v100) / 4 * factor3).toFixed(1);
    v[2] = (v500 - (v500 - v100) / 4 * factor2).toFixed(1);
    v[3] = (v500 - (v500 - v100) / 4 * factor1).toFixed(1);
    v[4] = v500;
    v[5] = (v500 - (v500 - v900) / 4 * factor1).toFixed(1);
    v[6] = (v500 - (v500 - v900) / 4 * factor2).toFixed(1);
    v[7] = (v500 - (v500 - v900) / 4 * factor3).toFixed(1);
    v[8] = v900;
    
    return v;
}

changeSliderShade = function(shade) {
    currSliderShade = shade;
    document.querySelector("#color-selector").classList.remove("selected100");
    document.querySelector("#color-selector").classList.remove("selected500");
    document.querySelector("#color-selector").classList.remove("selected900");
    document.querySelector("#color-selector").classList.add("selected" + shade);
    recalcColors();
};

function enableProMode() {
    domCheckboxProMode.checked = "checked";
    domInputH100.disabled = "";
    domInputS100.disabled = "";
    domInputL100.disabled = "";
    domInputH900.disabled = "";
    domInputS900.disabled = "";
    domInputL900.disabled = "";
    proMode = true;
}
function disableProMode() {
    domCheckboxProMode.checked = "";
    domInputH100.disabled = "disabled";
    domInputS100.disabled = "disabled";
    domInputL100.disabled = "disabled";
    domInputH900.disabled = "disabled";
    domInputS900.disabled = "disabled";
    domInputL900.disabled = "disabled";
    changeSliderShade(500);
    proMode = false;
    recalcColors();
}
function checkProMode() {
    if(domCheckboxProMode.checked) {
        enableProMode();
    } else {
        disableProMode();
    }
}








// color500.hue = getRandomInt(360);
// color500.sat = 60;
// color500.ltn = 50;
color500.color(getRandomInt(360), 60, 50);
disableProMode();
recalcColors();


function isNumeric(num){
    return !isNaN(num)
}
function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


domSliderHue.addEventListener("input", function() {
    window['color' + currSliderShade].hue = parseFloat(this.value);
    recalcColors();
});
domSliderSat.addEventListener("input", function() {
    window['color' + currSliderShade].sat = parseFloat(this.value);
    recalcColors();
});
domSliderLtn.addEventListener("input", function() {
    window['color' + currSliderShade].ltn = parseFloat(this.value);
    recalcColors();
});
domInputH500.addEventListener("input", function() {
    color500.hue = parseFloat(this.value);
    // changeSliderShade(500);
    recalcColors();
});
domInputS500.addEventListener("input", function() {
    color500.sat = parseFloat(this.value);
    // changeSliderShade(500);
    recalcColors();
});
domInputL500.addEventListener("input", function() {
    color500.ltn = parseFloat(this.value);
    changeSliderShade(500);
    recalcColors();
});
domInputH100.addEventListener("input", function() {
    color100.hue = parseFloat(this.value);
    // changeSliderShade(100);
    recalcColors();
});
domInputS100.addEventListener("input", function() {
    color100.sat = parseFloat(this.value);
    // changeSliderShade(100);
    recalcColors();
});
domInputL100.addEventListener("input", function() {
    color100.ltn = parseFloat(this.value);
    // changeSliderShade(100);
    recalcColors();
});
domInputH100.addEventListener("focus", function() {
    changeSliderShade(100);
});
domInputS100.addEventListener("focus", function() {
    changeSliderShade(100);
});
domInputL100.addEventListener("focus", function() {
    changeSliderShade(100);
});
domInputH500.addEventListener("focus", function() {
    changeSliderShade(500);
});
domInputS500.addEventListener("focus", function() {
    changeSliderShade(500);
});
domInputL500.addEventListener("focus", function() {
    changeSliderShade(500);
});
domInputH900.addEventListener("focus", function() {
    changeSliderShade(900);
});
domInputS900.addEventListener("focus", function() {
    changeSliderShade(900);
});
domInputL900.addEventListener("focus", function() {
    changeSliderShade(900);
});
domCheckboxProMode.addEventListener("change", function() {
    checkProMode();
});
