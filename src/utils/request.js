export const parseResult = (result) => {
    let resultJson = JSON.parse(result.substring(8))
    if (resultJson.code === 200) {
        return resultJson.data;
    }
};
