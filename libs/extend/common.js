//----------------------window--------------------
window.isString = function(str) {
    return typeof str == 'string' && str.trim().length > 0;
};

//----------------------date----------------------
Date.prototype.serial_num = function(){
    var date = this;
    var y = date.getFullYear().toString().substr(2);
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + m + d;
};

Date.prototype.get_day = function(d) { //default today(undefined)、oneday: -7 7、lastday 0
    var date = this; //default today  new Date()

    if (typeof d == 'number') {
        if (d != 0) { //oneday
            date = date.valueOf();
            date = date + d * 24 * 60 * 60 * 1000;
            date = new Date(date);
        } else { //this month lastday
            date = new Date(date.getFullYear(), date.getMonth(), 0);
        }
    }

    return date;
};

Date.prototype.get_lastday = function(m) {
    var y = new Date().getFullYear(), date;

    if (angular.isArray(m)) {
        date = [];
        angular.forEach(m, function(val) {
            val = parseInt(val) < 10 ? ('0' + val) : val;
            date.push(val + '月' + new Date(y, val, 0).getDate() + '日')
        });
    } else {
        m = parseInt(m) < 10 ? ('0' + m) : m;
        date = m + '月' + new Date(y, m, 0).getDate() + '日';
    }

    return date;
};

Date.prototype.to_str = function(isTime) { //是Date对象才可以调用to_str方法
    var m = this.getMonth() + 1;
    if (m < 10) m = '0' + m;

    var d = this.getDate();
    if (d < 10) d = '0' + d;

    var val = this.getFullYear() + "-" + m + "-" + d;

    if (isTime) {
        val += " ";
        $.each([this.getHours(), this.getMinutes(), this.getSeconds()], function (){
            if(this < 10)
                val += '0' + this + ':';
        });
        val = val.substr(0, val.length - 1);
    }

};

Date.convert = function(val) {
    if (typeof val != "string" || val.trim().length <= 0) {
        return undefined;
    }
    var dt = new Date(parseInt(val.toLowerCase().replace("/date(", "").replace(")/", "").split("+")[0]));
    var m = dt.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }

    var d = dt.getDate();
    if (d < 10) {
        d = '0' + d;
    }

    return dt.getFullYear() + "-" + m + "-" + d;
};

//---------------------string---------------------
String.prototype.replace_all = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2); //g全局     
};

String.prototype.contains = function(str) {
    if (typeof(str) == "string" && this.indexOf(str) >= 0) {
        return true;
    } else {
        return false;
    }
};

//---------------------array----------------------
Array.prototype.get = function(key, match_val, option) {
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj[key] == match_val) {
            if(option) { //option存在
                if(obj == 'del') { //del 表示删除
                    this.splice(i, 1);
                    return true;
                } else { //否则返回对象指定的option的值
                    return obj[option]; //找到后默认返回obj
                }
            } else { //未指定option，则返回value对象
                return obj;
            }
        }
    }

    return {}; //没有找到返回空对象{}
};

Array.prototype.exist = function(e) { //e可为string、number类型或等于null、undefined
    var exist = false;
    if (typeof e == "string") {
        var s = String.fromCharCode(2);
        exist = new RegExp(s + e + s).test(s + this.join(s) + s);
    } else {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == e) {
                exist = true;
                break;
            }
        }
    }

    return exist;
};

//---------------------number----------------------
Number.prototype.toFixed = function(exponent) { //overwrite toFixed function
    if (exponent) {
        var result = (parseInt(this * Math.pow(10, exponent) + 0.5) / Math.pow(10, exponent)).toString();
        var count = 0;
        if (result.indexOf(".") > 0) {
            count = exponent - result.split(".")[1].length;
        } else {
            count = exponent;
            result += ".";
        }

        for (count; count > 0; count--) {
            result += "0";
        }

        return result;
    } else {
        return parseInt(this);
    }
};

//---------------------number----------------------
window.calc = {
    addition: function(arg1, arg2) {
        var r1,
            r2,
            m,
            n,
            result;
        arg1 = arg1 == undefined ? 0 : arg1;
        arg2 = arg2 == undefined ? 0 : arg2;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        result = ((arg1 * m + arg2 * m) / m).toFixed(n);
        return Number(result) <= 0 ? undefined : result;
    },
    subtraction: function(arg1, arg2) {
        var r1,
            r2,
            m,
            n,
            result;
        arg1 = arg1 == undefined ? 0 : arg1;
        arg2 = arg2 == undefined ? 0 : arg2;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        result = ((arg1 * m - arg2 * m) / m).toFixed(n);
        return Number(result) <= 0 ? undefined : result;
    },
    multiplication: function(arg1, arg2) //乘法
    {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    division: function(arg1, arg2, n) //除法
    {
        arg1 = arg1 == undefined ? 0 : arg1;
        arg2 = arg2 == undefined ? 0 : arg2;
        if (arg1 == 0 || arg2 == 0) {
            return 0; //此处不能返回undefined
        } else {
            var t1 = 0,
                t2 = 0,
                r1,
                r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) {
            }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                n = n == undefined ? 4 : n;
                return parseFloat(((r1 / r2) * pow(10, t2 - t1)).toFixed(n));
            }
        }
    }
}