/**
 * Created by Wandergis on 2015/7/8.
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */
// UMD魔法代码
// if the module has no dependencies, the above pattern can be simplified to
// 定义一些常量
const xPI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const aa = 6378245.0;
const ee = 0.00669342162296594323;
/**
* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
* 即 百度 转 谷歌、高德
* @param bdLon
* @param bd_lat
* @returns {*[]}
*/
export function bd09togcj02(bdLon, bdLat) {
    const _bdLon = +bdLon;
    const _bdLat = +bdLat;
    const xxx = _bdLon - 0.0065;
    const yyy = _bdLat - 0.006;
    const zzz = Math.sqrt(xxx * xxx + yyy * yyy) - 0.00002 * Math.sin(yyy * xPI);
    const theta = Math.atan2(yyy, xxx) - 0.000003 * Math.cos(xxx * xPI);
    const ggLng = zzz * Math.cos(theta);
    const ggLat = zzz * Math.sin(theta);
    return [ggLng, ggLat];
}

/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/
export function gcj02tobd09(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    const zzzz = Math.sqrt(_lng * _lng + _lat * _lat) + 0.00002 * Math.sin(_lat * xPI);
    const theta = Math.atan2(_lat, _lng) + 0.000003 * Math.cos(_lng * xPI);
    const bdLng = zzzz * Math.cos(theta) + 0.0065;
    const bdLat = zzzz * Math.sin(theta) + 0.006;
    return [bdLng, bdLat];
}

/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
export function outOfChina(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    // 纬度3.86~53.55,经度73.66~135.05
    return !(_lng > 73.66 && _lng < 135.05 && _lat > 3.86 && _lat < 53.55);
}

export function transformlat(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    let ret = -100.0 + 2.0 * _lng + 3.0 * _lat + 0.2 * _lat * _lat + 0.1 * _lng * _lat + 0.2 * Math.sqrt(Math.abs(_lng));
    ret += (20.0 * Math.sin(6.0 * _lng * PI) + 20.0 * Math.sin(2.0 * _lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(_lat * PI) + 40.0 * Math.sin(_lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(_lat / 12.0 * PI) + 320 * Math.sin(_lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

export function transformlng(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    let ret = 300.0 + _lng + 2.0 * _lat + 0.1 * _lng * _lng + 0.1 * _lng * _lat + 0.1 * Math.sqrt(Math.abs(_lng));
    ret += (20.0 * Math.sin(6.0 * _lng * PI) + 20.0 * Math.sin(2.0 * _lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(_lng * PI) + 40.0 * Math.sin(_lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(_lng / 12.0 * PI) + 300.0 * Math.sin(_lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}

/**
* WGS84转GCj02
* @param lng
* @param lat
* @returns {*[]}
*/
export function wgs84togcj02(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    if (outOfChina(_lng, _lat)) {
        return [_lng, _lat];
    }
    let dlat = transformlat(_lng - 105.0, _lat - 35.0);
    let dlng = transformlng(_lng - 105.0, _lat - 35.0);
    const radlat = _lat / 180.0 * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((aa * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (aa / sqrtmagic * Math.cos(radlat) * PI);
    const mglat = _lat + dlat;
    const mglng = _lng + dlng;
    return [mglng, mglat];
}

/**
* GCJ02 转换为 WGS84
* @param lng
* @param lat
* @returns {*[]}
*/
export function gcj02towgs84(lng, lat) {
    const _lat = +lat;
    const _lng = +lng;
    if (outOfChina(_lng, _lat)) {
        return [_lng, _lat];
    }
    let dlat = transformlat(_lng - 105.0, _lat - 35.0);
    let dlng = transformlng(_lng - 105.0, _lat - 35.0);
    const radlat = _lat / 180.0 * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((aa * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (aa / sqrtmagic * Math.cos(radlat) * PI);
    const mglat = _lat + dlat;
    const mglng = _lng + dlng;
    return [_lng * 2 - mglng, _lat * 2 - mglat];
}
