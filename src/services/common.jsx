export const convertFormatMoney = (money = 0) => {
    let newMoney = '0';
    newMoney = money
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return newMoney;
};