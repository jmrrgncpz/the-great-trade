export default function propName(obj, expression) {
    var res = {};
    Object.keys(obj).map(key => { res[key] = () => k});
    return expression(res)();
}