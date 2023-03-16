//Check terminal, true means Mobile, false means PC
export function isMobileOrPc() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
}

// fn throttling
export function throttle(fn: Function, delay: number) {
    let last = 0,
        timer: any = null

    return function (...args: any[]) {
        const context = this as any
        const now = +new Date()
    
        if (now - last < delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
  
export function setCookie(cName: string, value: any, expiredays: any) {
    if (expiredays > 0 && expiredays !== "100") {
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie =
            cName +
            "=" +
            encodeURI(value) +
            // (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
            (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
    }
    if (expiredays === "100") {
        const exdate = new Date("2118-01-01 00:00:00");
        document.cookie =
            cName +
            "=" +
            encodeURI(value) +
            // (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
            (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
    }
}
export function getCookie(cName: string) {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cName + "=");
        if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            let cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return decodeURI(document.cookie.substring(cStart, cEnd));
        }
    }
    return "";
}

export function delCookie(name: string) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null)
      // document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
      document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}

export function clearCookie(name: string) {
    setCookie(name, "", -1);
}