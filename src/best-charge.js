var selectedItems = ["ITEM0013 x 4", "ITEM0022 x 1"];
var result = bestCharge(selectedItems);
console.log(listItemDetails(selectedItems));
console.log(result);
function bestCharge(selectedItems) {
  var itemArr = listItemDetails(selectedItems);
  var charge = calculateCharge(itemArr);
  var promotionPrice = calculateChargeAfterPromotion(charge, itemArr);
  return promotionPrice.reduce(function(prev, element) {
    return (prev <= element) ? prev : element;
  });
}
//用户输入的数据["ITEM0013 x 4", "ITEM0022 x 1"],在菜品价目表中找出价格等，每个item以object形式存放, 加入count，结果存为数组
//菜品价目列表--loadAllItems()
//优惠列表--loadPromotions()
//计算输入item的价格charge数字：calculateCharge，输入是array，输出是number
//计算优惠：各种优惠价格都算出来放在一个数组promotionPrice，输入有number的总价，array的菜品itemArr(itemArr[i]是object);
//在promotionPrice中比较优惠价格大小，输出最小的价格--主函数
function listItemDetails(array) {
  return array.map(function(element) {
    var splited = element.split(" x ");
    var itemList = loadAllItems();
    return itemList.reduce(function(prev, curr) {
      if (curr.id === splited[0]) {
        curr.count = Number(splited[1]);
        return prev = curr;
      }
      return prev;
    }, {});
  })
}
function calculateCharge(array) {
  return array.reduce(function(prev, curr) {
    return prev += curr.price * curr.count;
  }, 0);
}
function calculateChargeAfterPromotion(num, array) {
  var itemObj = {
    charge: 0,
    items: ['ITEM0001', 'ITEM0022'],
    promotion1: function() {
      return this.charge - ~~(this.charge / 30) * 6;
    },
    promotion2: function(array) {
      return array.reduce(function(prev, curr) {
        var currCharge = curr.price * curr.count;
        if (itemObj.items.includes(curr.id)) {
          currCharge = currCharge / 2;
        }
        return prev += currCharge;
      }, 0);
    }
  }
  itemObj.charge = num;
  var chargeArr = [];
  return chargeArr.concat(itemObj.promotion1(), itemObj.promotion2(array));
}


function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}