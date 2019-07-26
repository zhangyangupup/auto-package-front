// https://cn.vuejs.org/v2/api/#Vue-filter
import Vue from 'vue'

// 将时间戳转化为xxxx-xx-xx xx:xx:xx的时间格式
Vue.filter('datetime', timestamp => {
    function format(number) {
        return number.toString().padStart(2, '0')
    }

    const date = new Date(Number.parseInt(timestamp, 10))
    const YYYY = date.getFullYear()
    const MM = date.getMonth() + 1
    const DD = date.getDate()
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()
    return `${YYYY}-${format(MM)}-${format(DD)} ${format(hh)}:${format(mm)}:${format(ss)}`
})


/**
 * 将价格数字转化为xxx,xxx,xxx.xx格式
 * */
Vue.filter('priceFormat', number => {
    if (number === '' || number === null || number === 'null') {
        return ''
    }

    number = Number(number).toFixed(2)
    if (typeof number === 'number') {
        number = '' + number;
    }

    let integerStr = number.split('.')[0],
        decimalStr = number.split('.')[1],
        preStr

    if (decimalStr) {
        if (decimalStr.length === 1) {
            decimalStr = `.${decimalStr}0`
        } else {
            decimalStr = `.${decimalStr}`
        }
    } else {
        decimalStr = '.00'
    }

    if (integerStr.indexOf(',') > -1) {
        preStr = integerStr
    } else {
        let temp = [];
        let index = integerStr.length;
        while (index > 0) {
            let start, end
            if (index - 3 < 0) {
                start = 0;
            } else {
                start = index - 3
            }
            end = index;
            let s = integerStr.substring(start, end);
            index -= 3;
            temp.push(s)
        }
        preStr = temp.reverse().join(',')
    }

    return `${preStr}${decimalStr}`;
})
