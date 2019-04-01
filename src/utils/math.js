export const getLength = (str) => {
    let length = str.length;
    let lengthStr = length.toString();
    while (lengthStr.length < 4) {
        lengthStr = '0' + lengthStr;
    }
    return lengthStr;
}
